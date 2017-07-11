module lxl.interfaces {
	export interface IPackageIn {
		code():string;
		readId():string;
		readString():string;
		getPackageLen():number;
		readDate():Date;
		doUncompress():void;
		getPosition():number;
		setPosition(v:number):void;
		getLength():number;
		readNumber():number;
		readObj():Object;
	}
}