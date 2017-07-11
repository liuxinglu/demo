module lxl.data {
	export class PackageIn extends egret.ByteArray implements lxl.interfaces.IPackageIn {
		// public constructor(code: string, body: BaseData) {
		// 	this._code = code;
		// 	this._o = new BaseData();
		// 	this._o = body;
		// }

		// private _code: string;
		// private _o: BaseData;

		// public code(): string {
		// 	return this._code;
		// }

		// public readObj(): BaseData {
		// 	return this._o;
		// }

		// public readObjStr(): string {
		// 	var str: string = JSON.stringify(this._o);
		// 	if (this._o.propertyIsEnumerable("")) {
		// 		for (let i in this._o) {
		// 			str.concat(i, this._o[i])
		// 		}
		// 	}
		// 	return str;
		// }
		private _code:string;
		private _packageLen:number;
		private _autoDecode:boolean;
		private _based:BaseData;
		private _o:any;

		public constructor(str:egret.ByteArray, len:number, autoDecode:boolean = true) {
			super();
			let num:number = 0;
			str.readBytes(this, 0, len);

			let s:string = this.readUTFBytes(this.bytesAvailable);
			this._o = JSON.parse(s);
			this._packageLen = len;
			if(this._o.code == undefined || this._o.code == null || this._o.code == 0) {
				this._o.code = 888;
			}
			this._code = this._o.protocal;
		}

		public readNumber():number {
			this.readShort();
			let s1 = this.readShort();
			return (s1 << 8) * 256 * 256 * 256 + this.readUnsignedInt();	
		}

		public readString():string {
			return this.readUTFBytes(this._packageLen);
		}

		public readObj():Object {
			return this._o;
		}

		public readId():string {
			return this.readUTFBytes(32);
		}

		public readDate():Date {
			return new Date(this.readNumber());
		}

		public getPackageLen():number {
			return this._packageLen;
		}

		public code():string {
			return this._code;
		}

		public getPosition():number {
			return this.length;
		}

		public setPosition(pos:number):void {
			this.position = pos;
		}

		public getLength():number {
			return this.length;
		}

		public doUncompress():void {
			let barr1 = new egret.ByteArray();
			this.readBytes(barr1, 0, this._packageLen);
			this.writeBytes(barr1, 0, barr1.length);
			this._packageLen = barr1.length;
		}

	}
}