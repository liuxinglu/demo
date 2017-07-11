module lxl {
	export class CEventInit implements EventInit {
		bubbles: boolean;
		cancelable: boolean;
	}

	export class CEvent extends egret.Event{
		/**
		 *连接到服务器 
		 */		
		public static CONNECT_SERVER:string = "CEVENT::CONNECT_SERVER";
		
		/**
		 *连接失败 
		 */		
		public static CONNECT_FAIL:string = "CEVENT::CONNECT_FAIL";
		public static CONNECT_CLOSE:string = "CEVENT::CONNECT_CLOSE";
		/**
		 * 安全错误
		 */
		public static SECURITY_ERROR:string = "CEVENT::SECURITY_ERROR";
		public static SOCKET_CLOSE:string = "CEVENT::SOCKET_CLOSE";
		public static SOCKET_DATA:string = "CEVENT::SOCKET_DATA";

		/**
		 *加载资源完成 
		 */		
		public static LOAD_SKIN_COMPLETE:string = "CEVENT::LOAD_SKIN_COMPLETE";
		/**
		 * 加载配置完成
		 */
		public static LOAD_CONFIG_COMPLETE:string = "CEVENT::LOAD_CONFIG_COMPLETE";
		/**
		 * 加载一组资源完成
		 */
		public static LOAD_GROUP_COMPLETE:string = "CEVENT::LOAD_GROUP_COMPLETE";
		/**
		 * 加载进度
		 */
		public static LOAD_PROGRESS:string = "CEVENT::LOAD_PROGRESS";

		public static CLICK:string = "CEVENT::CLICK";

		//完成选择
		public static SEL_COMPLETE:string = "CEVENT::SEL_COMPLETE";
		//成功完成游戏
		public static SUCCESS:string = "CEVENT::SUCCESS";
		//返回
		public static BACK:string = "CEVENT::BACK";
		//左右上下
		public static UP:string = "CEVENT::UP";
		public static DOWN:string = "CEVENT::DOWN";
		public static LEFT:string = "CEVENT::LEFT";
		public static RIGHT:string = "CEVENT::RIGHT";
		public static SPACE:string = "CEVENT::SPACE";
		public static STAGE_CLICK:string = "CEVENT::STAGE_CLICK";
		//护眼模式
		public static PROTECTE_EYE:string = "CEVENT::PROTECTE_EYE";
		public static EYE_CHANGE:string = "CEVENT::EYE_CHANGE";
		public static SEND_MESSAGE:string = "CEVENT::SEND_MESSAGE";
		private _param:any;
		cancelBubble;
		public constructor(type:string, param:any = null, timeSpan:number = 0, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, bubbles, cancelable, param);
			// let ceinit:CEventInit = new CEventInit();
			// ceinit.bubbles = bubbles;
			// ceinit.cancelable = cancelable;
			this._param = param;
		}

		public get param():any {
			return this._param;
		}

	}
}