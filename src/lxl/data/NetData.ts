module lxl.data {
	export class NetData extends egret.HashObject{
		public constructor(dataManager:interfaces.IDataManager) {
			super();
			this._dataManager = dataManager;
			// this._httpRequest = new egret.HttpRequest();
			this._socket = new egret.WebSocket();
			this._socket.type = egret.WebSocket.TYPE_BINARY;
			this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
			this._socket.addEventListener(egret.Event.CONNECT, this.handleConnect, this);
			this._socket.addEventListener(egret.Event.CLOSE, this.handleClose, this);
			this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleIoError, this);
			this._changingConnect = false;
			this.isReadHead = true;
			this.headLen = 4;
			this._msgLenMax = 8000;
		}

		// private _httpRequest:egret.HttpRequest;
		private _info:interfaces.ISocketInfo;
		private _socket:egret.WebSocket;
		private _readBuffer:egret.ByteArray;
		private _dataManager:interfaces.IDataManager;
		private _changingConnect:boolean;
		private _msgLenMax:number;//收到的消息最大长度
		private _msgLen:number;//消息长度
		private headLen:number;//消息头长度
		private isReadHead:boolean;//是否已经读了消息头
		private _messageString:string = "";
		private _messageBuffer:string = "";//消息缓冲
		private _cb:Function;
		private _ctx:any;

		public send(pkg:data.PackageOut):boolean {
			if(!this._socket.connected)
				return false;
			this._socket.writeBytes((pkg))
			lxl.logs.log(pkg.toString());
			return true;
		}

		private handleIoError(e:egret.IOErrorEvent):void {
			logs.log(e.type);
			this._dataManager.handlerSecurityError();
		}

		private handleConnect(e:egret.Event) {
			this._changingConnect = false;
			this._dataManager.handleConnect();
		}

		private onSocketData(e:egret.ProgressEvent) {
			let s:string = e.data;
			let subStr:string;
			let byteArr2:egret.ByteArray;
			this._messageString = this._messageBuffer + s;

			if(this._messageString.indexOf("$") == -1) {
				this._messageBuffer += this._messageString;
			} else {
				do {
					subStr = this._messageString.substring(0, this._messageString.indexOf("$"));
					byteArr2 = new egret.ByteArray();
					byteArr2.clear();
					byteArr2.writeUTFBytes(subStr);
					byteArr2.position = 0;
					let pin:PackageIn = new PackageIn(byteArr2, byteArr2.bytesAvailable);
					this._dataManager.handlerPackage(pin);
					this._messageString = this._messageString.substr(this._messageString.indexOf("$"));
				} while(this._messageString.indexOf("$") > 0)
			}
		}

		private handleClose(e:egret.Event):void {
			lxl.logs.error(e.currentTarget.toString());
			if(!this._changingConnect) {
				this._dataManager.handleClose();
			}
			this._changingConnect = false;
		}

		public dispose() {
			this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
			this._socket.removeEventListener(egret.Event.CONNECT, this.handleConnect, this);
			this._socket.removeEventListener(egret.Event.CLOSE, this.handleClose, this);
			this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleIoError, this);
			if(this._socket) {
				if(this._socket.connected)
					this._socket.close();
			}
			this._socket = null;
		}

		public isConnect():boolean {
			return this._socket.connected;
		}

		public close():void {
			if(this._socket)
				this._socket.close();
		}

		public isSameSocket(info:interfaces.ISocketInfo):boolean {
			if(!this._info)
				return false;
			if(this._info.ip != info.ip)
				return false;
			if(this._info.port != info.port)
				return false;
			return this._socket.connected;
		}

		public connect(inf:interfaces.ISocketInfo):void {
			let info:interfaces.ISocketInfo = inf;
			try {
				if(this.isSameSocket(info)) {
					this.handleConnect(null);
					return;
				}
				this._info = info;
				if(this._socket) {
					if(this._socket.connected) {
						this._changingConnect = true;
						this._socket.close();
					}
				}
				this._socket.connect(this._info.ip(), this._info.port());
			} catch(e) {
				lxl.logs.error("socket connect error:" + e);
			}
		}


		// public send(pkg:interfaces.IPackageOut, cb:Function = null, ctx:any = null):boolean {
		// 	this._httpRequest.responseType = egret.HttpResponseType.TEXT;
		// 	this._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
		// 	this._httpRequest.addEventListener(egret.Event.COMPLETE, this._completeHandler, this);
		// 	this._httpRequest.open(pkg.getFullUrl(), egret.HttpMethod.POST);
			
		// 	this._cb = cb;
		// 	this._ctx = ctx;
			
		// 	if(pkg.getParamLen() > 0) {
		// 		this._httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// 		let param = Tool.MapToField(pkg.getParam());
		// 		this._httpRequest.send(param);
		// 	} else {
		// 		this._httpRequest.send();
		// 	}
		// 	lxl.logs.log("发送协议名：" + pkg.code() + " url:" + pkg.getFullUrl());
		// 	lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SEND_MESSAGE, pkg));
		// 	return true;
		// }

		// private _completeHandler(e:egret.Event):void {
		// 	let request = <egret.HttpRequest>e.currentTarget;
		// 	// this._cb(request.response, this._ctx);
		// 	let json = JSON.parse(request.response);
		// 	let pin:interfaces.IPackageIn = new lxl.data.PackageIn(json.code, request.response);
		// 	lxl.logs.log("收到协议名：" + pin.code() + " data:" + request.response);
		// 	this._dataManager.handlerPackage(pin);
		// 	this.dispose();
		// }

		// public dispose():void {
		// 	if(this._httpRequest.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
		// 		this._httpRequest.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
		// 		this._httpRequest.removeEventListener(egret.Event.COMPLETE, this._cb, this._ctx);
		// 	}
		// }

	}
}