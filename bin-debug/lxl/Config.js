var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var Config = (function () {
        function Config() {
        }
        return Config;
    }());
    //动画前置路径
    Config.MC_PATH = "resource/assets/mc/";
    Config.SKIN_PATH = "resource/app_skins/";
    Config.GRID_SIZE = 48;
    lxl.Config = Config;
    __reflect(Config.prototype, "lxl.Config");
})(lxl || (lxl = {}));
//# sourceMappingURL=Config.js.map