module app { 
	export class SnakeManager {
		public constructor() {
		}

		static CHANGE_LIFE:string = "SNAKEMANAGER::CHANGE_LIFE";//生命值改变

		arrSnakeParts:Array<SnakePart> = [];//蛇身
		arrTargets:Array<SnakeTarget> = [];//恶魔果实
		curBattle:number = 0;//当前关卡 0-4
		private _lastLife:number = 3;//当前剩余生命
		snakeLens:Array<number> = [3, 3, 3, 4, 5];//每一关蛇的长度
		targetsLens:Array<number> = [8, 12, 12, 16, 16];//每一关目标的个数
		timeNum:number = 500;//每步的移动时间
		areaX:number = 161;
		areaY:number = 79;
		areaW:number = 816;
		areaH:number = 480;
		//每一关可选的质数集合
		battleTarget1:Array<Array<number>> = [[2, 3, 5, 7], [11, 13, 17, 19]];
		battleTarget2:Array<Array<number>> = [[2, 3, 5, 7], [23, 29, 31, 37]];
		battleTarget3:Array<Array<number>> = [[2, 3, 5, 7], [41, 43, 47]];
		battleTarget4:Array<Array<number>> = [[3, 5], [23, 29, 31, 37]];
		battleTarget5:Array<Array<number>> = [[2, 3], [23, 29, 31, 37, 41, 43, 47]];

		private _trueTargets = [];
		set lastLife(num:number) {
			this._lastLife = num;
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(SnakeManager.CHANGE_LIFE));
		}

		get lastLife():number {
			return this._lastLife;
		}

		get trueTargets():Array<any> {
			return this._trueTargets;
		}

		/**
		 * 创建一个目标
		 */
		createTarget():SnakeTarget {
			var tar:SnakeTarget = new SnakeTarget();
			return tar;
		}

		/**
		 * 创建一个蛇身
		 */
		createPart():SnakePart {
			var part:SnakePart = new SnakePart();
			return part;
		}

		/**
		 * 生成目标组
		 */
		genTargets() {
			this.arrTargets = [];
			for(var i = 0; i < this.targetsLens[this.curBattle]; i++) {
				if(this._trueTargets[i] != null) {
					let target = this.createTarget();
					let pnt = this.getRandomPos();
					target.x = pnt.x;
					target.y = pnt.y;
					target.setTarget(this._trueTargets[i], this.areaW, this.areaH);
					this.arrTargets.push(target);
				} else {
					let target = this.createTarget();
					let pnt = this.getRandomPos();
					target.x = pnt.x;
					target.y = pnt.y;
					target.setTarget(Math.floor(Math.random() * 30) + 2, this.areaW, this.areaH);
					this.arrTargets.push(target);
				}
			}
		}

		getRandomPos():egret.Point {
			let xx = Snake.areaX + Math.floor(Math.random() * (this.areaW / lxl.Config.GRID_SIZE)) * lxl.Config.GRID_SIZE;
			let yy = Snake.areaY + Math.floor(Math.random() * (this.areaH / lxl.Config.GRID_SIZE)) * lxl.Config.GRID_SIZE;
			let pnt = new egret.Point(xx, yy);
			for(let j = 0; j < this.arrSnakeParts.length; j++) {
				if(this.arrSnakeParts[j].x == xx) {
					pnt = this.getRandomPos();
					break;
				}
				for(let i = 0; i < this.arrTargets.length; i++) {
					if(this.arrTargets[i].x == xx && this.arrTargets[i].y == yy) {
						pnt = this.getRandomPos();
						break;
					}
				}
				if(this.arrSnakeParts[j].x != xx && j == this.arrSnakeParts.length - 1) {
					return pnt;
				}
			}
			return pnt;
		}

		/**
		 * 生成蛇
		 */
		createSnake() {
			this.arrSnakeParts = [];
			let yy = this.areaY + Math.floor(Math.random() * 10) * lxl.Config.GRID_SIZE;
			for(var i = 0; i < this.snakeLens[this.curBattle]; i++) {
				let part:SnakePart = this.createPart();
				part.x = this.areaX + lxl.Config.GRID_SIZE * i;
				part.y = yy;
				if(i == this.snakeLens[this.curBattle]-1)
					part.value = this.genPrimeSum();
				this.arrSnakeParts.push(part);
			}
		}

		resetSnake() {
			let yy = this.areaY + Math.floor(Math.random() * 10) * lxl.Config.GRID_SIZE;
			for(var i = 0; i < this.arrSnakeParts.length; i++) {
				this.arrSnakeParts[i].y = yy;
				this.arrSnakeParts[i].x = this.areaX + lxl.Config.GRID_SIZE * i;
			}
		}

		/**
		 * 生成当前关卡的质数乘积
		 */
		genPrimeSum():number {
			let arr = [];
			let num = this.curBattle == 4 ? 4 : 2;
			if(this.curBattle == 3) {
				num = 3;
			}
			let index = 0;
			for(var i = 0; i < this.snakeLens[this.curBattle]; i++) {
				if(i < num) {
					if((this.curBattle == 4 || this.curBattle == 3) && i == num - 1) {
						arr.push(7);
					}else {
						index = Math.floor(this["battleTarget" + (this.curBattle + 1)][0].length * Math.random());
						arr.push(this["battleTarget" + (this.curBattle + 1)][0][index]);
					}
				} else {
					index = Math.floor(this["battleTarget" + (this.curBattle + 1)][1].length * Math.random());
					arr.push(this["battleTarget" + (this.curBattle + 1)][1][index]);
				}
			}
			lxl.logs.log(arr.toString());
			
			this._trueTargets = arr;
			let sum = 1;
			for(var j = 0; j < arr.length; j++) {
				sum *= arr[j];
			}
			return sum;
		}

		private static _snake:SnakeManager;
		public static getInstance():SnakeManager {
			if(this._snake == null)
				this._snake = new SnakeManager();
			return this._snake;
		}
	}
}