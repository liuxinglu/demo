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
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            var _this = _super.call(this) || this;
            _this.isThemeLoadEnd = false;
            _this.isResourceLoadEnd = false;
            return _this;
        }
        Application.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            this.root = new lxl.ui.CLayer();
            this.shape = new egret.Shape();
            this._logo = new eui.Image();
            var assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            this.addEventListener(egret.Event.RESIZE, this._resizeHandler, this);
            Res.addListener(lxl.CEvent.LOAD_CONFIG_COMPLETE, this._conConfigComplete, this);
            this.preURL = lxl.Tool.callJS("getURL");
            Res.loadConfig(this.preURL + "resource/default.res.json", this.preURL + "resource/");
        };
        Application.prototype._conConfigComplete = function (event) {
            Res.removeListener(lxl.CEvent.LOAD_CONFIG_COMPLETE, this._conConfigComplete, this);
            //加在皮肤主题配置文件，可以手动覆盖这个文件，替换默认皮肤
            var theme = new eui.Theme(this.preURL + "resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            Res.addListener(lxl.CEvent.LOAD_GROUP_COMPLETE, this._onResourceLoadComplete, this);
            Res.loadGroup("preload");
        };
        Application.prototype._resizeHandler = function (event) {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0x996600);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        };
        Application.prototype.onThemeLoadComplete = function (e) {
            this.isThemeLoadEnd = true;
            this.createScene();
        };
        Application.prototype._onResourceLoadComplete = function (e) {
            if ("preload" == e.data.groupName) {
                this.loading = new lxl.LoadingUI();
                this.loading.width = this.width; //1136 * (this.width / 1136);
                this.loading.height = this.height; //640 * (this.height / 640);
                this.loading.createView();
                this.stage.addChild(this.loading);
                Res.addListener(lxl.CEvent.LOAD_PROGRESS, this._onResourceProgress, this);
                Res.loadGroup("main");
            }
            else {
                egret.Tween.get(this.loading)
                    .to({ alpha: 0 }, 1000)
                    .call(this.resourceComplete, this);
            }
        };
        Application.prototype.resourceComplete = function () {
            this.stage.removeChild(this.loading);
            this.isResourceLoadEnd = true;
            this.createScene();
            Res.removeListener(lxl.CEvent.LOAD_GROUP_COMPLETE, this._onResourceLoadComplete, this);
        };
        Application.prototype._onResourceProgress = function (e) {
            this.loading.setProgress(e.data.itemsLoaded, e.data.itemsTotal);
        };
        Application.prototype.createScene = function () {
            if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
                this.start();
                this.root.delegate = this;
                this.stage.addChild(this.root);
                this._logo.source = "img_logo_png";
                this._logo.x = 10;
                this._logo.y = 10;
                this.stage.addChild(this._logo);
                if (egret.Capabilities.runtimeType == "web")
                    document.onkeydown = this.keyDownHandler;
                this.shape.graphics.beginFill(0x996600);
                this.shape.graphics.drawRect(0, 0, this.width, this.height);
                this.shape.graphics.endFill();
                this.shape.alpha = 0;
                this.shape.visible = false;
                this.stage.addChild(this.shape);
                lxl.Toast.getInstance().init(this, Res.getRes("full1_png"));
                lxl.CDispatcher.getInstance().addListener(lxl.CEvent.CHANGE, this.changeModel, this);
            }
        };
        Application.prototype.keyDownHandler = function (ev) {
            switch (ev.keyCode) {
                case 32:
                    lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SPACE, "space"));
                    break;
                case 37:
                    lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.LEFT, "left"));
                    break;
                case 38:
                    lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.UP, "up"));
                    break;
                case 39:
                    lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.RIGHT, "right"));
                    break;
                case 40:
                    lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.DOWN, "down"));
                    break;
            }
        };
        Application.prototype.changeModel = function (e) {
            var _this = this;
            if (this.shape.visible == false) {
                this.shape.alpha = 0;
                this.shape.visible = true;
                egret.Tween.get(this.shape)
                    .to({ alpha: 0.35 }, 1000, egret.Ease.quadOut).call(function () {
                });
            }
            else {
                egret.Tween.get(this.shape)
                    .to({ alpha: 0 }, 1000, egret.Ease.quintIn).call(function () {
                    _this.shape.visible = false;
                });
            }
        };
        Application.prototype.start = function () {
        };
        return Application;
    }(lxl.ui.CLayer));
    lxl.Application = Application;
    __reflect(Application.prototype, "lxl.Application");
})(lxl || (lxl = {}));
//# sourceMappingURL=Application.js.map