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
    var MainSence = (function (_super) {
        __extends(MainSence, _super);
        function MainSence() {
            return _super.call(this) || this;
        }
        MainSence.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this._addMain();
        };
        MainSence.prototype._addMain = function () {
            var _this = this;
            var mainSnail = new app.MainLLK();
            mainSnail.name = "mainFan";
            mainSnail.width = this.stage.stageWidth;
            mainSnail.height = this.stage.stageHeight;
            mainSnail.addEventListener(lxl.CEvent.CLICK, this._mainHandler, this);
            mainSnail.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                if (_this.getChildByName("view")) {
                    _this.getChildByName("view").removeEventListener(lxl.CEvent.BACK, _this._addMain, _this);
                    _this.getChildByName("view").dispose();
                }
                _this.addChild(mainSnail);
            }, this);
        };
        MainSence.prototype._mainHandler = function (e) {
            var _this = this;
            var view = new app.MainView();
            view.name = "view";
            view.addEventListener(lxl.CEvent.BACK, this._addMain, this);
            view.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                _this.getChildByName("mainFan").removeEventListener(lxl.CEvent.CLICK, _this._mainHandler, _this);
                _this.getChildByName("mainFan").dispose();
                _this.addChild(view);
            }, this);
        };
        return MainSence;
    }(lxl.ui.CLayer));
    app.MainSence = MainSence;
    __reflect(MainSence.prototype, "app.MainSence");
})(app || (app = {}));
//# sourceMappingURL=MainSence.js.map