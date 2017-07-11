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
    var DlgWin = (function (_super) {
        __extends(DlgWin, _super);
        function DlgWin() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgWinSkin.exml") || this;
        }
        DlgWin.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.6);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this.btn_jixu.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_zhishi.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
            this._sound = Res.getRes("win_mp3");
            this._sound.play(0, 1);
            this._sound1 = Res.getRes("click_guanqia_mp3");
            this.lab_count.text = (Llk.usedTimes).toString();
        };
        DlgWin.prototype._helpHandler = function (e) {
            this._help = new app.DlgHelp();
            this.pop(this._help);
            this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
        };
        DlgWin.prototype.helpClose = function () {
            this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
            this._help.dispose();
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
        };
        DlgWin.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.CHANGE));
        };
        DlgWin.prototype._knowledgeHandler = function (e) {
            this._zhishi = new app.DlgZhishi();
            this.pop(this._zhishi);
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = false;
            this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this);
        };
        DlgWin.prototype.knowledgeClose = function () {
            this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this);
            this._zhishi.dispose();
            this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
        };
        DlgWin.prototype._closeHandler = function (e) {
            this._sound1.play(0, 1);
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
        };
        DlgWin.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_jixu.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_zhishi.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
        };
        return DlgWin;
    }(lxl.CComponent));
    app.DlgWin = DlgWin;
    __reflect(DlgWin.prototype, "app.DlgWin");
})(app || (app = {}));
//# sourceMappingURL=DlgWin.js.map