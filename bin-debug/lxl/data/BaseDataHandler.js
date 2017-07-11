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
    var data;
    (function (data_1) {
        var BaseDataHandler = (function (_super) {
            __extends(BaseDataHandler, _super);
            function BaseDataHandler() {
                return _super.call(this) || this;
            }
            BaseDataHandler.prototype.getCode = function () {
                return "";
            };
            BaseDataHandler.prototype.handlerPackage = function (data) {
            };
            BaseDataHandler.prototype.configure = function (data) {
            };
            BaseDataHandler.prototype.send = function (data) {
                if (data === void 0) { data = null; }
            };
            return BaseDataHandler;
        }(lxl.CDispatcher));
        data_1.BaseDataHandler = BaseDataHandler;
        __reflect(BaseDataHandler.prototype, "lxl.data.BaseDataHandler", ["lxl.interfaces.IDataHandler", "egret.IEventDispatcher"]);
    })(data = lxl.data || (lxl.data = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=BaseDataHandler.js.map