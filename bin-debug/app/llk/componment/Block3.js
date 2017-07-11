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
    var Block3 = (function (_super) {
        __extends(Block3, _super);
        function Block3() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "Block3.exml") || this;
            _this._num = 0;
            return _this;
        }
        Block3.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
        };
        Block3.prototype._clickHandler = function (e) {
            var _this = this;
            if (this.img_num.visible == true)
                return;
            this.img_num.visible = true;
            egret.Tween.get(this.img_bg)
                .to({ alpha: 0, rotation: 360 }, 200)
                .call(function () {
                _this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, _this));
            });
        };
        Object.defineProperty(Block3.prototype, "num", {
            get: function () {
                return this._num;
            },
            set: function (num) {
                this.turnBack();
                this._num = num;
                this.img_num.source = "btn_yu" + num + "_png";
            },
            enumerable: true,
            configurable: true
        });
        Block3.prototype.turnBack = function () {
            this.img_bg.visible = true;
            this.img_bg.alpha = 1;
            this.img_bg.rotation = 0;
            this.img_num.visible = false;
        };
        Block3.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
        };
        return Block3;
    }(lxl.CComponent));
    app.Block3 = Block3;
    __reflect(Block3.prototype, "app.Block3");
})(app || (app = {}));
//# sourceMappingURL=Block3.js.map