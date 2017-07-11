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
    (function (data) {
        var NetData = (function (_super) {
            __extends(NetData, _super);
            function NetData(dataManager) {
                var _this = _super.call(this) || this;
                _this._dataManager = dataManager;
                _this._netConnet = new egret.HttpRequest();
                return _this;
            }
            NetData.prototype.errorHandler = function (e) {
                lxl.logs.log(e.type);
                this._dataManager.handlerSecurityError();
            };
            NetData.prototype.send = function (pkg, cb, ctx) {
                this._netConnet.open(pkg.getFullUrl(), egret.HttpMethod.POST);
                this._cb = cb;
                this._ctx = ctx;
                this._netConnet.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                this._netConnet.addEventListener(egret.Event.COMPLETE, this._completeHandler, this);
                if (pkg.getParamLen() > 0) {
                    this._netConnet.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var param = lxl.Tool.MapToField(pkg.getParam());
                    this._netConnet.send(param);
                }
                else {
                    this._netConnet.send();
                }
            };
            NetData.prototype._completeHandler = function (e) {
                this._cb(this._netConnet.response, this._ctx);
                this.dispose();
            };
            NetData.prototype.dispose = function () {
                if (this._netConnet.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                    this._netConnet.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                    this._netConnet.removeEventListener(egret.Event.COMPLETE, this._cb, this._ctx);
                }
            };
            return NetData;
        }(egret.HashObject));
        data.NetData = NetData;
        __reflect(NetData.prototype, "lxl.data.NetData");
    })(data = lxl.data || (lxl.data = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=NetData.js.map