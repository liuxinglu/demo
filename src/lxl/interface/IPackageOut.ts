
module lxl.interfaces {
	export interface IPackageOut {
        getPosition():number;
        setPosition(v:number):void;
        setPackageLen():void;
        toString():string;
        /***
         * 写入string
         */
	writeString(str:string):void;
        /**
         * 写入数组
         */
        writeArray(arr:Array<any>):void;
        /**
         * 获取协议名
         */
        code():string;
        writeDate(date:Date);
        getLength():number;
        doCompress():void;
        writeNumber(n:number):void;
        /**
         * 读取变量数量
         */
        getParamLen():number;

        getParamByIndex(index:number):any;

        getFullUrl():string;

        getParam():Array<data.Map>;
	}
}