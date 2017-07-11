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
    var AlertPanel = lxl.ui.AlertPanel;
    var ConfirmPanel = lxl.ui.ConfirmPanel;
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = true;
            return _this;
        }
        Object.defineProperty(Alert.prototype, "alertPanel", {
            get: function () {
                if (this._alertPanel == null) {
                    this._alertPanel = new AlertPanel();
                    this.addChildAt(this._alertPanel, 0);
                }
                return this._alertPanel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Alert.prototype, "confirmPanel", {
            get: function () {
                if (this._confirmPanel == null) {
                    this._confirmPanel = new ConfirmPanel();
                    this.addChildAt(this._confirmPanel, 0);
                }
                return this._confirmPanel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Alert, "instance", {
            get: function () {
                if (this._instance == null)
                    this._instance = new Alert();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Alert.showAlert = function (text, okHandler, ctx) {
            if (okHandler === void 0) { okHandler = null; }
            if (ctx === void 0) { ctx = null; }
            this.instance.alertPanel.show(text, okHandler, ctx);
        };
        Alert.showConfirm = function (text, okHandler, cancelHandler, ctx) {
            if (cancelHandler === void 0) { cancelHandler = null; }
            if (ctx === void 0) { ctx = null; }
            this.instance.confirmPanel.show(text, okHandler, cancelHandler, ctx);
        };
        return Alert;
    }(lxl.ui.CLayer));
    lxl.Alert = Alert;
    __reflect(Alert.prototype, "lxl.Alert");
})(lxl || (lxl = {}));
//# sourceMappingURL=Alert.js.map