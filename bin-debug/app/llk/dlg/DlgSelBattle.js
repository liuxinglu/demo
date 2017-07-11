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
    var DlgSelBattle = (function (_super) {
        __extends(DlgSelBattle, _super);
        function DlgSelBattle() {
            return _super.call(this, lxl.Config.SKIN_PATH + "SelBattleSkin.exml") || this;
        }
        DlgSelBattle.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_1.addEventListener(lxl.CEvent.CLICK, this._model1Handler, this);
            this.btn_2.addEventListener(lxl.CEvent.CLICK, this._model2Handler, this);
            this.btn_3.addEventListener(lxl.CEvent.CLICK, this._model3Handler, this);
            this.btn_home.addEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
            this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._zhishiHandler, this);
            this._sound = Res.getRes("click_guanqia_mp3");
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.6);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
        };
        DlgSelBattle.prototype._model1Handler = function (e) {
            this._sound.play(0, 1);
            Llk.curLevel = 0;
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgSelBattle.prototype._model2Handler = function (e) {
            Llk.curLevel = 1;
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgSelBattle.prototype._model3Handler = function (e) {
            Llk.curLevel = 2;
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgSelBattle.prototype._homeHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
        };
        DlgSelBattle.prototype._helpHandler = function (e) {
            this._help = new app.DlgHelp();
            this.pop(this._help);
            this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
        };
        DlgSelBattle.prototype.helpClose = function () {
            this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
            this._help.dispose();
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        DlgSelBattle.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.CHANGE));
        };
        DlgSelBattle.prototype._zhishiHandler = function (e) {
            this._zhishi = new app.DlgZhishi();
            this.pop(this._zhishi);
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = false;
            this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this);
        };
        DlgSelBattle.prototype.knowledgeClose = function () {
            this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this);
            this._zhishi.dispose();
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        DlgSelBattle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_1.removeEventListener(lxl.CEvent.CLICK, this._model1Handler, this);
            this.btn_2.removeEventListener(lxl.CEvent.CLICK, this._model2Handler, this);
            this.btn_3.removeEventListener(lxl.CEvent.CLICK, this._model3Handler, this);
            this.btn_home.removeEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_knowledge.removeEventListener(lxl.CEvent.CLICK, this._zhishiHandler, this);
        };
        return DlgSelBattle;
    }(lxl.CComponent));
    app.DlgSelBattle = DlgSelBattle;
    __reflect(DlgSelBattle.prototype, "app.DlgSelBattle");
})(app || (app = {}));
//# sourceMappingURL=DlgSelBattle.js.map