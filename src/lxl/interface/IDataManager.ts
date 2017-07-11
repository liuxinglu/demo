module lxl.interfaces {
	export interface IDataManager{
		/**
		 * 断开连接
		 */
		disConnect():void;
		/**
		 * 关闭连接
		 */
		close():void;
		/**
		 * 设置连接
		 */
		setDataConnect(info:ISocketInfo, successHandler:Function, errorHandler:Function, ctx:any):void;
		/**
		 * 检测是否是当前服务器
		 * 
		 */	
		isSameSocket(info:ISocketInfo):boolean;
		/**
		 * 添加包处理方法
		 */
		addDataHandler(handler:IDataHandler):void;
		/**
		 * 删除包处理方法
		 */
		removeDataHandler(code:string):void;
		/**
		 * 获取包处理方法
		 */
		getDataHandler(code:string):IDataHandler;
		/**
		 * 处理协议
		 */
		handlerPackage(pkg:IPackageIn):void;
		/**
		 * 发送协议
		 */
		send(pkg:IPackageOut):void;
		/**
		 * 安全错误处理
		 */
		handlerSecurityError():void;
		/**
		 * 连接反馈处理
		 */
		handleConnect():void;

		getPackageIn(str:egret.ByteArray, len:number, autoDecode:boolean):IPackageIn;
		getPackageOut(code:string):IPackageOut;
		isConnect():boolean;
		handleClose():void;
	}
}