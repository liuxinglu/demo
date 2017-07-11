var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxl;
(function (lxl) {
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createView = function () {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = 100;
            this.textField.width = 280;
            this.textField.height = 100;
            this.textField.textAlign = "center";
            var bitmap = lxl.Tool.createBitmapByName("logo_png");
            var tw = this.height * 1.775;
            var h = this.height * (bitmap.height / 1080);
            var w = tw * (bitmap.width / 1920);
            bitmap.width = w;
            bitmap.height = h;
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
            bitmap.x = this.width / 2;
            bitmap.y = this.height / 2;
            this.addChild(bitmap);
        };
        LoadingUI.prototype.setProgress = function (current, total) {
            // this.textField.text = `Loading...${current}/${total}`;
        };
        return LoadingUI;
    }(egret.Sprite));
    lxl.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "lxl.LoadingUI");
})(lxl || (lxl = {}));
//# sourceMappingURL=LoadingUI.js.map