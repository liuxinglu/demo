module app {
	export class MainGrid extends lxl.CComponent{
		public constructor() {
			super("resource/app_skins/MainGrid.exml");
		}

		private btn_up:lxl.ui.CButton;
		private btn_down:lxl.ui.CButton;
		private btn_left:lxl.ui.CButton;
		private btn_right:lxl.ui.CButton;
		private btn_help:lxl.ui.CButton;
		private btn_huyan:lxl.ui.CButton;
		private btn_knowledge:lxl.ui.CButton;
		private btn_home:lxl.ui.CButton;
		private img_1:eui.Image;
		private img_2:eui.Image;
		private img_3:eui.Image;
		stageH:number = 0;
		stageW:number = 0;
		private _timer:egret.Timer;
		

		onActivity():void {
			super.onActivity();
			this.btn_up.eps = 0.4;
			this.btn_right.eps = 0.4;
			this.btn_left.eps = 0.4;
			this.btn_down.eps = 0.4;
			if(!this.btn_up.hasEventListener(lxl.CEvent.CLICK)) {
				this.btn_up.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_down.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_left.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_right.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_home.addEventListener(lxl.CEvent.CLICK, this._backHandler, this);
				this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
				this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
				this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
				lxl.CDispatcher.getInstance().addListener(SnakeManager.CHANGE_LIFE, this.changeLife, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.LEFT, this._dirHandler, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.UP, this._dirHandler, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.RIGHT, this._dirHandler, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.DOWN, this._dirHandler, this);
			}
			Snake.lastLife = 3;
			this.stageH = this.stage.stageHeight;
			this.stageW = this.stage.stageWidth;
			Snake.createSnake();
			Snake.genTargets();
			let v = 0;
			let len = Snake.arrSnakeParts.length;
			for(var i = 0; i < len; i++) {
				if(i == len - 1) {
					Snake.arrSnakeParts[i].imgSource = "img_chongTou_png";
					Snake.arrSnakeParts[i].partRotation = this.moveDistance;
					if(v != 0)
						Snake.arrSnakeParts[i].value = v;
				} else {
					Snake.arrSnakeParts[i].imgSource = "img_chongShenTi_png";	
					for(var j = 0; j < len; j++) {
						if(Snake.arrSnakeParts[j].value != 0) {
							v = Snake.arrSnakeParts[j].value;
							break;
						}
					}
				}
			}
			for(var i = 0; i < Snake.arrSnakeParts.length; i++) {
				Snake.arrSnakeParts[i].i = i;
				Snake.arrSnakeParts[i].addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, (e:lxl.CEvent)=>{
					this.addChildAt(Snake.arrSnakeParts[e.param.i], 1);	
				}, this);
			}
			for(var i = 0; i < Snake.arrTargets.length; i++) {
				Snake.arrTargets[i].i = i;
				Snake.arrTargets[i].addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, (e:lxl.CEvent)=>{
					this.addChildAt(Snake.arrTargets[e.param.i], 1);
				}, this);
			}
			if(len != 0)
				this.startTime();
		}

		private reset() {
			this._timer.stop();
			for(let i = 0; i < Snake.arrSnakeParts.length; i++)
				this.removeChild(Snake.arrSnakeParts[i]);
			for(let i = Snake.arrTargets.length - 1; i >= 0; i--)
				this.removeChild(Snake.arrTargets[i]);
			this.moveDistance = "right";
			this.onActivity();
		}

		private startTime() {
			this._timer = new egret.Timer(Snake.timeNum);
			if(!this._timer.hasEventListener(egret.TimerEvent.TIMER))
				this._timer.addEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			this._timer.start();
		}

		dispose() {
			super.dispose();
			this.btn_up.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_down.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_left.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_right.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_knowledge.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this._timer.stop();
			if(this._timer.hasEventListener(egret.TimerEvent.TIMER))
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			lxl.CDispatcher.getInstance().removeListener(SnakeManager.CHANGE_LIFE, this.changeLife, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.LEFT, this._dirHandler, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.UP, this._dirHandler, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.RIGHT, this._dirHandler, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.DOWN, this._dirHandler, this);
		}

		private changeLife(e:lxl.CEvent) {
			for(var i = 0; i < 3; i++)
				this["img_" + (i + 1)].visible = false;
			for(var i = 0; i < Snake.lastLife; i++)
				this["img_" + (i + 1)].visible = true;
		}

		private _sound:egret.Sound;
		private gameOver() {
			if(Snake.lastLife == 0) {
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
				this._showFail();
				return;
			} else {
				this._timer.stop();
				this._sound = Res.getRes("wall_mp3");
				this._sound.play(0, 1);
				this._lock = true;
				Snake.lastLife--;
				this.moveDistance = "right";
				egret.Tween.get(this)
					.wait(1000).call(()=>{
                		Snake.resetSnake();
						this.moveDistance = "right";        
						this._timer.start();
						this._lock = false;
				});
				if(Snake.lastLife == 0) {
					this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
					this._showFail();
					return;
				}
			}
		}
		
		private _showWin() {
			this._lock = true;
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			this._win = new DlgWin();
			this.pop(this._win);
			this._win.addEventListener(lxl.CEvent.CLOSE, this._winClose, this);
		}

		private _showFail() {
			this._lock = true;
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			this._fail = new DlgFail();
			this.pop(this._fail);
			this._fail.addEventListener(lxl.CEvent.CLOSE, this._failClose, this);
		}

		private _win:app.DlgWin;
		private _winClose(e:lxl.CEvent = null) {
			this._lock = false;
			this._win.removeEventListener(lxl.CEvent.CLOSE, this._winClose, this);
			this._win.dispose();
			if(e.param == 1) {
				Snake.curBattle++;
				if(Snake.curBattle >= 5)
					Snake.curBattle = 4;
			}
			this.reset();
		}

		private _fail:app.DlgFail;
		private _failClose() {
			this._lock = false;
			this._fail.removeEventListener(lxl.CEvent.CLOSE, this._failClose, this);
			this._fail.dispose();
			this.reset();
		}

		private _lock:boolean = false;
		private _dirHandler(e:lxl.CEvent) {
			if (e.param == "up" && this.moveDistance != "down") {
				// if(this.moveDistance == "up")
				this.moveDistance = "up";
					this.viewUpdate();
			}else if (e.param == "down" && this.moveDistance != "up") {
				// if(this.moveDistance == "down")
				this.moveDistance = "down";
					this.viewUpdate();
			}else if (e.param == "left" && this.moveDistance != "right") {
				// if(this.moveDistance == "left")
				this.moveDistance = "left";
					this.viewUpdate();
			}else if (e.param == "right" && this.moveDistance != "left") {
				// if(this.moveDistance == "right")
				this.moveDistance = "right";
					this.viewUpdate();
			}
		}

		private moveDistance:string = "right";
		private _directionHandler(e:lxl.CEvent) {
			if (e.target == this.btn_up && this.moveDistance != "down") {
				// if(this.moveDistance == "up")
				this.moveDistance = "up";
					this.viewUpdate();	
			}else if (e.target == this.btn_down && this.moveDistance != "up") {
				// if(this.moveDistance == "down")
				this.moveDistance = "down";
					this.viewUpdate();
			}else if (e.target == this.btn_left && this.moveDistance != "right") {
				// if(this.moveDistance == "left")
				this.moveDistance = "left";
					this.viewUpdate();
			}else if (e.target == this.btn_right && this.moveDistance != "left") {
				// if(this.moveDistance == "right")
				this.moveDistance = "right";
					this.viewUpdate();
			}
			
		}

		// private timeUpdate:number = 1;
		private speed:number = 0;
		private score:number = 0;
		private viewUpdate(e:egret.Event = null):void{
			var head = Snake.arrSnakeParts[Snake.arrSnakeParts.length - 1];
			// this.timeUpdate++;
			if(this._lock == true)
				return;
			if (this.speed != 9) {
				this.speed = Math.floor(this.score / 10);
			}
			if(Snake.arrSnakeParts.length == 0) {
				this._showWin();
				return;
			}
			//吃到目标
			let snakeBody = Snake.arrSnakeParts[Snake.arrSnakeParts.length - 1];
			for(var j = 0; j < Snake.arrTargets.length; j++) {
				let target = Snake.arrTargets[j]; 
				if (snakeBody.x == target.x && snakeBody.y == target.y && snakeBody.value != 0) {
					for(var i = 0; i < Snake.trueTargets.length; i++) {
						if(target.value == Snake.trueTargets[i]) {
							snakeBody.value = snakeBody.value / target.value;
							this.score++;
							this.removeChild(Snake.arrSnakeParts[0]);
							Snake.arrSnakeParts.shift();
							this.removeChild(Snake.arrTargets[j]);
							Snake.arrTargets.splice(j, 1);
							Snake.trueTargets.splice(i, 1);
							break;
						} else if(i == Snake.trueTargets.length -1){
							this.gameOver();
							return;
						}
					}
				}
			}
			//蛇身相撞，游戏结束
			for (var i = 0; i < Snake.arrSnakeParts.length - 1; i++) {
				if (head.x == Snake.arrSnakeParts[i].x && head.y == Snake.arrSnakeParts[i].y) {
					this.gameOver();
					return;
				}
			}
			//蛇身移动
			if (Snake.arrSnakeParts.length != 0)
				this.move();
		}

		private move() {
			var head = Snake.arrSnakeParts[Snake.arrSnakeParts.length - 1];
			var headX:number = head.x;
			var headY:number = head.y;
			var tail = Snake.arrSnakeParts[0];
			var tailX = tail.x;
			var tailY = tail.y;

			if (this.moveDistance == "up") {
				if (headY <= Snake.areaY) {
					this.gameOver();
					return;
				} else {
					tail.y = headY - lxl.Config.GRID_SIZE;
				}
				tail.x = headX;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
			}else if (this.moveDistance == "down") {
				if (headY + lxl.Config.GRID_SIZE >= Snake.areaH + Snake.areaY) {
					this.gameOver();
					return;
				}else{
					tail.y = headY+lxl.Config.GRID_SIZE;
				}
				tail.x = headX;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
			}else if (this.moveDistance == "left") {
				if (headX <= Snake.areaX) {
					this.gameOver();
					return;
				}else{
					tail.x = headX - lxl.Config.GRID_SIZE;
				}
				tail.y = headY;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
			}else if (this.moveDistance == "right") {
				if (headX + lxl.Config.GRID_SIZE >= Snake.areaW + Snake.areaX) {
					this.gameOver();
					return;
				}else{
					tail.x = headX + lxl.Config.GRID_SIZE;
				}
				tail.y = headY;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
			}
			let len = Snake.arrSnakeParts.length;
			let v = 0;
			for(var i = 0; i < len; i++) {
				if(i == len - 1) {
					Snake.arrSnakeParts[i].imgSource = "img_chongTou_png";
					Snake.arrSnakeParts[i].partRotation = this.moveDistance;
					if(v != 0)
						Snake.arrSnakeParts[i].value = v;
				} else {
					Snake.arrSnakeParts[i].imgSource = "img_chongShenTi_png";	
					for(var j = 0; j < len; j++) {
						if(Snake.arrSnakeParts[j].value != 0) {
							v = Snake.arrSnakeParts[j].value;
							break;
						}
					}
					Snake.arrSnakeParts[i].value = 0;
				}
			}
		}

		private _help:app.DlgHelp;
		private _helpHandler(e:lxl.CEvent):void {
			this._timer.stop();
			this._help = new app.DlgHelp();
			this.pop(this._help);
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = false;
			this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
		}

		private helpClose() {
			this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this)
			this._help.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = true;
			this._timer.start();
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		private _zhishi:app.DlgZhishi;
		private _knowledgeHandler(e:lxl.CEvent):void {
			this._timer.stop();
			this._zhishi = new app.DlgZhishi();
			this.pop(this._zhishi);
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = false;
			this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this);
		}

		private knowledgeClose() {
			this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this)
			this._zhishi.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = true;
			this._timer.start();
		}

		private _backHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
		}

	}
}