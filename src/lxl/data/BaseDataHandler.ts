module lxl.data {
	export class BaseDataHandler
		extends CDispatcher
		implements interfaces.IDataHandler {

		protected pin:lxl.interfaces.IPackageIn;
		protected data:Object;
		protected handlerData:Object;
		public constructor(handlerData:Object = null) {
			super();
			this.handlerData = handlerData;
		}

		public getCode(): string {
			return "";
		}

		public handlerPackage(_data: Object): void {
			if(_data != undefined) {
				this.data = this.pin.readObj();
				lxl.logs.log("收到协议名：" + this.getCode() + "内容:" + this.data.toString());
			}
		}

		public configure(data:interfaces.IPackageIn): void {
			this.pin = data;
		}

		public send(data: data.BaseData = null): void {

		}

		public handComplete() {
			this.data = null;
			this.pin = null;
		}

		public dispose():void {
			this.handlerData = null;
			this.data = null;
			this.pin = null;
		}

	}
}