module lxl.data {
	export class PackageOut extends egret.ByteArray implements lxl.interfaces.IPackageOut {
		public constructor(code: string) {
			super();
			this._code = code;
			this._o = new BaseData();
		}

		private _code: string;
		private _o: BaseData;

		public writeString(str: string): void {
			if (str == null) {
				this.writeUTF("");
			} else {
				this.writeUTFBytes(str);
			}
		}

		public writeNumber(n:number):void {
			let ba = new egret.ByteArray();
			ba.writeUnsignedInt(Math.floor(n / 4294967295));
			ba.writeUnsignedInt(Math.floor(n));
			this.writeBytes(ba);
			ba = null;
			// this._o.str.writeUnsignedInt(n);``````
		}

		public toString():string {
			this.position = 0;
			return this.readUTFBytes(this.bytesAvailable);
			// this._o.str.position = 0;
			// return this._o.str.toString();
		}

		public getPosition():number {
			return this.position;
		}

		public setPosition(n:number):void {
			this.position = n;
		}

		public getLength():number {
			return this.length;
		}

		public setPackageLen():void {
			let byArr:egret.ByteArray = new egret.ByteArray();
			byArr.writeShort(this.length);
			this[0] = byArr[0];
			this[1] = byArr[1];
		}

		public writeArray(arr: Array<any>): void {
			if (arr.length > 0)
				this._o.arr = arr;
		}

		public getParamLen(): number {
			return this._o.arr.length
		}

		public getParamByIndex(index: number): any {
			if (index >= 0) {
				return this._o.arr[index];
			} else {
				return 0;
			}
		}

		public getParam():any {
			return this._o.arr;
		}

		public code(): string {
			return this._code;
		}

		public doCompress():void {
			let b2:egret.ByteArray = new egret.ByteArray();
			this.readBytes(b2, 0, this.length);
			this.length = 0;
			this.writeBytes(b2);
			this[2] = 1;
		}

		public writeDate(date:Date):void {
			this.writeInt(Math.floor(date.getTime() / 1000));
		}

		public getFullUrl(): string {
			return "http://192.168.122.132:9090/" + this.code() + "/";
		}

	}
}