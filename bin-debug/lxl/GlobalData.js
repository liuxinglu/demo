var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var GlobalData = (function () {
        function GlobalData() {
            this.resManager = new lxl.ResManager();
        }
        GlobalData.prototype.connectServer = function () {
            this.dataManager = new lxl.DataManager();
            this.dataManager.addListener(lxl.CEvent.CONNECT_SERVER, this.connectServerComplete, this);
        };
        GlobalData.prototype.connectServerComplete = function (e) {
        };
        GlobalData.getInstance = function () {
            if (this._instance == null)
                this._instance = new GlobalData();
            return this._instance;
        };
        return GlobalData;
    }());
    lxl.GlobalData = GlobalData;
    __reflect(GlobalData.prototype, "lxl.GlobalData");
})(lxl || (lxl = {}));
//# sourceMappingURL=GlobalData.js.map