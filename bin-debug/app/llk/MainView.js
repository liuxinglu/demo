var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "MainView.exml") || this;
            _this._overFlag = false;
            _this._timer = new egret.Timer(1000);
            return _this;
        }
        MainView.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.lab_time.text = "00:00";
            this._sound = Res.getRes("challengewin_mp3");
            this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_home.addEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
            var sel = new app.DlgSelBattle();
            sel.name = "sel";
            this.pop(sel);
            sel.addEventListener(lxl.CEvent.BACK, this._goHome, this);
            sel.addEventListener(lxl.CEvent.CLOSE, this._selBattleClose, this);
        };
        MainView.prototype._goHome = function (e) {
            this.getChildByName("sel").removeEventListener(lxl.CEvent.BACK, this._goHome, this);
            this.getChildByName("sel").removeEventListener(lxl.CEvent.CLOSE, this._selBattleClose, this);
            this.getChildByName("sel").dispose();
            this._homeHandler(e);
        };
        MainView.prototype._selBattleClose = function (e) {
            this.getChildByName("sel").removeEventListener(lxl.CEvent.BACK, this._goHome, this);
            this.getChildByName("sel").removeEventListener(lxl.CEvent.CLOSE, this._selBattleClose, this);
            this.getChildByName("sel").dispose();
            this._startGame();
        };
        MainView.prototype._startGame = function () {
            this._timer = new egret.Timer(1000);
            this._timer.reset();
            this._timer.addEventListener(egret.TimerEvent.TIMER, this._updateTime, this);
            this._timer.start();
            Llk.curTimes = lxl.TimerUtils.formatTimeBySecond(Llk.timeArr[Llk.curLevel]);
            this.lab_time.text = Llk.curTimes;
            this.b1.visible = this.b2.visible = this.b3.visible = false;
            this["b" + (Llk.curLevel + 1)].reset();
            this["b" + (Llk.curLevel + 1)].visible = true;
            if (this["b" + (Llk.curLevel + 1)].hasEventListener(lxl.CEvent.SUCCESS))
                return;
            this["b" + (Llk.curLevel + 1)].addEventListener(lxl.CEvent.SUCCESS, this._showTenHandler, this);
        };
        MainView.prototype._timerReset = function () {
            this._timer.reset();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this._updateTime, this);
        };
        MainView.prototype._updateTime = function (e) {
            if (this._overFlag == true)
                return;
            Llk.curTimes = lxl.TimerUtils.formatTimeBySecond(--Llk.timeArr[Llk.curLevel]);
            this.lab_time.text = Llk.curTimes;
            if (Llk.timeArr[Llk.curLevel] <= 0) {
                this._overFlag = true;
                this.gameOver(0);
                return;
            }
            Llk.usedTimes++;
        };
        MainView.prototype._showTenHandler = function (e) {
            var _this = this;
            if (this._overFlag == true)
                return;
            if (e.param == 0) {
                this.img_result.rotation = 0;
                this.img_result.visible = true;
                this.img_result.alpha = 1;
                this._sound.play(0, 1);
                egret.Tween.get(this.img_result)
                    .to({ scaleX: 1.2, scaleY: 1.2 }, 250)
                    .to({ scaleX: 1, scaleY: 1 }, 200)
                    .to({ rotation: 360, scaleX: 0.1, scaleY: 0.1, alpha: 0 }, 200);
            }
            else {
                this._overFlag = true;
                egret.Tween.get(this)
                    .wait(1000).call(function () {
                    _this.gameOver(1);
                });
            }
        };
        MainView.prototype.gameOver = function (num) {
            this._timerReset();
            num == 0 ? this._showFail() : this._showWin();
            Llk.timeArr = [30, 60, 100];
            this["b" + (Llk.curLevel + 1)].reset();
            this["b" + (Llk.curLevel + 1)].removeEventListener(lxl.CEvent.SUCCESS, this._showTenHandler, this);
        };
        MainView.prototype._showWin = function () {
            if (this._win == null) {
                this._win = new app.DlgWin();
                this.pop(this._win);
                this._win.addEventListener(lxl.CEvent.CLOSE, this._winClose, this);
            }
        };
        MainView.prototype._showFail = function () {
            if (this._fail == null) {
                this._fail = new app.DlgFail();
                this.pop(this._fail);
                this._fail.addEventListener(lxl.CEvent.CLOSE, this._failClose, this);
            }
        };
        MainView.prototype._failClose = function (e) {
            this._overFlag = false;
            this._fail.removeEventListener(lxl.CEvent.CLOSE, this._failClose, this);
            this._fail.dispose();
            this._fail = null;
            Llk.usedTimes = 0;
            this._startGame();
        };
        MainView.prototype._winClose = function (e) {
            this._overFlag = false;
            this._win.removeEventListener(lxl.CEvent.CLOSE, this._winClose, this);
            this._win.dispose();
            this._win = null;
            Llk.usedTimes = 0;
            this._startGame();
        };
        MainView.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.CHANGE));
        };
        MainView.prototype._helpHandler = function (e) {
            this._help = new app.DlgHelp();
            this.pop(this._help);
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
            this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
        };
        MainView.prototype.helpClose = function () {
            this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
            this._help.dispose();
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        MainView.prototype._knowledgeHandler = function (e) {
            this._zhishi = new app.DlgZhishi();
            this.pop(this._zhishi);
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
            this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
        };
        MainView.prototype.zhishiClose = function () {
            this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
            this._zhishi.dispose();
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        MainView.prototype._homeHandler = function (e) {
            this._timerReset();
            Llk.timeArr = [30, 60, 100];
            Llk.usedTimes = 0;
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
        };
        MainView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_knowledge.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_home.removeEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this._updateTime, this);
        };
        return MainView;
    }(lxl.CComponent));
    app.MainView = MainView;
    __reflect(MainView.prototype, "app.MainView");
})(app || (app = {}));
//# sourceMappingURL=MainView.js.map