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
    var ui;
    (function (ui) {
        var CButton = (function (_super) {
            __extends(CButton, _super);
            function CButton() {
                var _this = _super.call(this) || this;
                /** 点击频度限制 */
                _this.eps = 0.2;
                _this._clickEps = 0.2;
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._onClick, _this);
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                return _this;
            }
            CButton.prototype.onActivity = function (e) {
                this.init();
            };
            CButton.prototype.init = function () {
                if (this.eps > 0) {
                    this._timer = new egret.Timer(1000 * this.eps);
                    this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
                    this._timer.start();
                }
            };
            CButton.prototype._timerHandler = function (e) {
                this._clickEps = this._clickEps == this.eps ? this.eps : (this._clickEps + 0.1);
            };
            CButton.prototype._onClick = function (e) {
                this.scaleX = this.scaleY = 0.9;
                var ee = lxl.Tool.copyObject(e);
                egret.Tween.get(this)
                    .to({ scaleX: 0.9, scaleY: 0.9 }, 200)
                    .to({ scaleX: 1, scaleY: 1 }, 100)
                    .call(function () {
                    // if(this.eps == this._clickEps) {
                    this._clickEps = 0;
                    this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, ee));
                    // }
                }, this);
            };
            return CButton;
        }(eui.Button));
        ui.CButton = CButton;
        __reflect(CButton.prototype, "lxl.ui.CButton");
    })(ui = lxl.ui || (lxl.ui = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=CButton.js.map