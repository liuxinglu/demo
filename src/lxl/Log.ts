module lxl {
	export class Log{
		public constructor() {
		}

		//向控制台打印日志
		public log(msg:string):void {
			console.log('%c ' + msg, 'color: #00ff00');
		}

		public error(msg:string):void {
			console.log('%c ' + msg, 'color: #ff0000');
		}

		

		//对外抛出错误
		public fatal(msg:string):void {
			alert(msg);
		}
	}
	export var logs:Log = new Log();
}
