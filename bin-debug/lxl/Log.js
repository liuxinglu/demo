var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var Log = (function () {
        function Log() {
        }
        //向控制台打印日志
        Log.prototype.log = function (msg) {
            console.log(msg);
        };
        //对外抛出错误
        Log.prototype.fatal = function (msg) {
            alert(msg);
        };
        return Log;
    }());
    lxl.Log = Log;
    __reflect(Log.prototype, "lxl.Log");
    lxl.logs = new Log();
})(lxl || (lxl = {}));
//# sourceMappingURL=Log.js.map