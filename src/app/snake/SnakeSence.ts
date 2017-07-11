module app {
	export class SnakeSence extends lxl.ui.CLayer{
		public constructor() {
			super();
		}

		onActivity():void {
			super.onActivity();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.CLICK, this.closeMain, this);
			let m:MainSence = new app.MainSence();
			m.width = this.stage.stageWidth;
			m.height = this.stage.stageHeight;
			m.name = "main";
			m.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				this.addChild(m);
			}, this);
			
		}

		private closeMain(e:lxl.CEvent) {
			let sel:SelBattle = new SelBattle();
			sel.width = this.stage.stageWidth;
			sel.height = this.stage.stageHeight;
			sel.name = "sel";
			sel.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				this.addChild(sel);
			}, this);
			sel.addEventListener(lxl.CEvent.SEL_COMPLETE, this.closeSel, this);
			sel.addEventListener(lxl.CEvent.BACK, this._backHandler, this);
			
		}

		private _backHandler(e:lxl.CEvent) {
			this.getChildByName("sel").removeEventListener(lxl.CEvent.SEL_COMPLETE, this.closeSel, this);
			this.getChildByName("sel").removeEventListener(lxl.CEvent.BACK, this._backHandler, this);
			(this.getChildByName("sel") as SelBattle).dispose();
		}

		private closeSel(e:lxl.CEvent) {
			let main:MainGrid = new app.MainGrid();
			main.width = this.stage.stageWidth;
			main.height = this.stage.stageHeight;
			main.name = "man";
			main.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				this.getChildByName("sel").removeEventListener(lxl.CEvent.SEL_COMPLETE, this.closeSel, this);
				this.getChildByName("sel").removeEventListener(lxl.CEvent.BACK, this._backHandler, this);
				(this.getChildByName("sel") as SelBattle).dispose();
				this.addChild(main);
			}, this);
			main.addEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
		}

		private _backMainHandler(e:lxl.CEvent) {
			this.getChildByName("man").removeEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
			(this.getChildByName("man") as MainGrid).dispose();
		}
	}
}