module lxl.interfaces {
	export interface ISocketInfo extends egret.IEventDispatcher {
		ip():string;
		port():number;
		
	}
}