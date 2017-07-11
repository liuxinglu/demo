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
    var MainLLK = (function (_super) {
        __extends(MainLLK, _super);
        function MainLLK() {
            return _super.call(this, lxl.Config.SKIN_PATH + "MainFan.exml") || this;
        }
        MainLLK.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_start.addEventListener(lxl.CEvent.CLICK, this._startHandler, this);
            this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
        };
        MainLLK.prototype._huyanHandler = function (e) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.CHANGE));
        };
        MainLLK.prototype._startHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK));
        };
        MainLLK.prototype._helpHandler = function (e) {
            this._help = new app.DlgHelp();
            this.pop(this._help);
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
            this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
        };
        MainLLK.prototype.helpClose = function () {
            this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
            this._help.dispose();
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        MainLLK.prototype._knowledgeHandler = function (e) {
            this._zhishi = new app.DlgZhishi();
            this.pop(this._zhishi);
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
            this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
        };
        MainLLK.prototype.zhishiClose = function () {
            this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
            this._zhishi.dispose();
            this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
        };
        MainLLK.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
            this.btn_knowledge.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
            this.btn_start.removeEventListener(lxl.CEvent.CLICK, this._startHandler, this);
            this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
        };
        return MainLLK;
    }(lxl.CComponent));
    app.MainLLK = MainLLK;
    __reflect(MainLLK.prototype, "app.MainLLK");
})(app || (app = {}));
//# sourceMappingURL=MainLLK.js.map