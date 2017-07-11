var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 刘兴禄 on 2016/12/19.
 */
var lxl;
(function (lxl) {
    var ui;
    (function (ui) {
        var AlertPanel = (function (_super) {
            __extends(AlertPanel, _super);
            function AlertPanel() {
                return _super.call(this, "") || this;
            }
            AlertPanel.prototype.onOK = function () {
                close();
                if (this.okHandler == null)
                    return;
                this.okHandler.call(this.ctx);
            };
            AlertPanel.prototype.show = function (txt, funOk, ctx) {
                this.okHandler = funOk;
                this.ctx = ctx;
                this.label.text = txt;
                egret.Tween.get(this)
                    .to({ alpha: 1 }, 800, egret.Ease.quintOut);
            };
            AlertPanel.prototype.close = function () {
                var _this = this;
                egret.Tween.get(this)
                    .to({ alpha: 0 }, 1200, egret.Ease.quintIn).call(function () {
                    if (_this.parent) {
                        _this.parent.removeChild(_this);
                    }
                });
            };
            AlertPanel.prototype.onActivity = function () {
                _super.prototype.onActivity.call(this);
                this.btn_ok.addEventListener(lxl.CEvent.CLICK, this.onOK, this);
            };
            return AlertPanel;
        }(lxl.CComponent));
        ui.AlertPanel = AlertPanel;
        __reflect(AlertPanel.prototype, "lxl.ui.AlertPanel");
    })(ui = lxl.ui || (lxl.ui = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=AlertPanel.js.map