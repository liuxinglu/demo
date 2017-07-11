module lxl {
	export class DataManager extends CDispatcher implements interfaces.IDataManager{
		public constructor() {
			super();
			this._dataHandlers = [];
		}

		private _dataHandlers:Array<data.Map>;
		private _netData:data.NetData;
		private _successHandler:Function;
		private _errorHandler:Function;
		private _ctx:any;


		public addDataHandler(handler:interfaces.IDataHandler):void {
			let map = new lxl.data.Map(handler.getCode(), handler);
			if(Tool.getValueByKey(this._dataHandlers, handler.getCode()) == null) {
				Tool.setMapValue(this._dataHandlers, map);
			}
		}

		public removeDataHandler(code:string):void {
			if(Tool.getValueByKey(this._dataHandlers, code) != null) {
				Tool.removeMapValue(this._dataHandlers, code);
			}
		}

		public getDataHandler(code:string):interfaces.IDataHandler {
			return Tool.getValueByKey(this._dataHandlers, code);
		}

		public disConnect():void {
			if(this._netData) {
				this._netData.dispose();
				this._netData = null;
			}
		}

		public close():void {
			if(this._netData) {
				this._netData.close();
			}
		}

		public handleClose():void {
			this.dispatch(new lxl.CEvent(lxl.CEvent.CONNECT_CLOSE));
		}

		public setDataConnect(info:lxl.interfaces.ISocketInfo, successHandler:Function = null, errorHandler:Function = null, ctx:any):void {
			if(this._netData == null)
				this._netData = new data.NetData(this);
			this._successHandler = successHandler;
			this._errorHandler = errorHandler;
			this._ctx = ctx;
			this._netData.connect(info);
		}

		public handlerPackage(pkg:interfaces.IPackageIn):void {
			var handler:interfaces.IDataHandler = Tool.getValueByKey(this._dataHandlers, pkg.code());
			if(handler != null) {
				pkg.setPosition(0);
				handler.configure(pkg);
				handler.handlerPackage(null);
			}
			pkg.setPosition(0);
			this.dispatch(new lxl.CEvent(lxl.CEvent.SOCKET_DATA, pkg));
		}

		public send(pkg:data.PackageOut):void {
			if(this._netData == null)
				return;
			this._netData.send(pkg);
		}

		public handlerSecurityError():void {
			this.dispatch(new lxl.CEvent(CEvent.SECURITY_ERROR));
		}

		public handleConnect():void {
			if(this._successHandler != null)
				this._successHandler();
			this.dispatch(new CEvent(CEvent.CONNECT_SERVER));
		}

		public isSameSocket(info:interfaces.ISocketInfo):boolean {
			if(!this._netData) {
				return false;
			}
			return this._netData.isSameSocket(info);
		}

		public isConnect():boolean {
			return this._netData.isConnect();
		}

		public handleConnectFail():void {
			if(this._errorHandler != null) {
				this._errorHandler();
			}
			this.dispatch(new lxl.CEvent(lxl.CEvent.CONNECT_FAIL));
		}

		public getPackageIn(str:egret.ByteArray, len:number, autoDecode:boolean):interfaces.IPackageIn {
			return new data.PackageIn(str, len, autoDecode);
		}

		public getPackageOut(code:string	):interfaces.IPackageOut {
			return new data.PackageOut(code);
		}

	}
}