var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Res = lxl.GlobalData.getInstance().resManager;
var Llk = app.LlkManager.getInstance();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.start = function () {
        _super.prototype.start.call(this);
        this.root = new app.MainSence();
        this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
    };
    return Main;
}(lxl.Application));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map