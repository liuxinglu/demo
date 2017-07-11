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
    var DataManager = (function (_super) {
        __extends(DataManager, _super);
        function DataManager() {
            var _this = _super.call(this) || this;
            _this._dataHandlers = [];
            return _this;
        }
        DataManager.prototype.disConnect = function () {
            if (this._netData) {
                this._netData.dispose();
                this._netData = null;
            }
        };
        DataManager.prototype.close = function () {
        };
        DataManager.prototype.setDataConnect = function (info, userId) {
            if (this._netData == null)
                this._netData = new lxl.data.NetData(this);
        };
        DataManager.prototype.addDataHandler = function (handler) {
            var map = new lxl.data.Map();
            map.k = handler.getCode();
            map.v = handler;
            if (lxl.Tool.getValueByKey(this._dataHandlers, handler.getCode()) == null) {
                lxl.Tool.setMapValue(this._dataHandlers, map);
            }
        };
        DataManager.prototype.removeDataHandler = function (code) {
            if (lxl.Tool.getValueByKey(this._dataHandlers, code) != null) {
                lxl.Tool.removeMapValue(this._dataHandlers, code);
            }
        };
        DataManager.prototype.getDataHandler = function (code) {
            return lxl.Tool.getValueByKey(this._dataHandlers, code);
        };
        DataManager.prototype.handlerPackage = function (pkg) {
            var handler = lxl.Tool.getValueByKey(this._dataHandlers, pkg.code());
            if (handler != null) {
                handler.configure(pkg);
                handler.handlerPackage(null);
            }
        };
        DataManager.prototype.send = function (pkg, cb, ctx) {
            if (this._netData == null)
                return;
            this._netData.send(pkg, cb, ctx);
        };
        DataManager.prototype.handlerSecurityError = function () {
        };
        DataManager.prototype.handlerConnect = function () {
            this.dispatch(new lxl.CEvent(lxl.CEvent.CONNECT_SERVER));
        };
        return DataManager;
    }(lxl.CDispatcher));
    lxl.DataManager = DataManager;
    __reflect(DataManager.prototype, "lxl.DataManager", ["lxl.interfaces.IDataManager"]);
})(lxl || (lxl = {}));
//# sourceMappingURL=DataManager.js.map