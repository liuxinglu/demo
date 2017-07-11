var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var Tool = (function () {
        function Tool() {
        }
        /**PC模式检测 */
        Tool.isPC_Mode = function () {
            if ("Windows PC" == egret.Capabilities.os)
                return true;
            if ("Mac OS" == egret.Capabilities.os)
                return true;
            return false;
        };
        /**TS直接调用JS函数 */
        Tool.callJS = function (funcName) {
            var param = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                param[_i - 1] = arguments[_i];
            }
            if (egret.Capabilities.runtimeType == "native")
                return "";
            return window[funcName].apply(window, param);
        };
        Tool.MapToField = function (m) {
            var arr = [];
            m.forEach(function (element) {
                arr.push(element.k + "=" + encodeURIComponent(element.v));
            }, this);
            return arr.join('&');
        };
        Tool.getValueByKey = function (m, key) {
            var value;
            for (var i = 0; i < m.length; i++) {
                if (m[i].k == key) {
                    value = m[i].v;
                    return value;
                }
            }
            return null;
        };
        Tool.setMapValue = function (m, map) {
            for (var i = 0; i < m.length; i++) {
                if (m[i].k == map.k) {
                    m[i].v = map.v;
                    return;
                }
            }
            m.push(map);
        };
        Tool.getMapValue = function (m, key) {
            for (var i = 0; i < m.length; i++) {
                if (m[i].k == key)
                    return m[i];
            }
            return null;
        };
        Tool.removeMapValue = function (m, key) {
            for (var i = 0; i < m.length; i++) {
                if (m[i].k == key)
                    m.splice(i, 1);
            }
        };
        Tool.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = Res.getRes(name);
            result.texture = texture;
            return result;
        };
        Tool.copyObject = function (e) {
            var a = {};
            for (var i in e) {
                a[i] = e[i];
            }
            return a;
        };
        return Tool;
    }());
    lxl.Tool = Tool;
    __reflect(Tool.prototype, "lxl.Tool");
})(lxl || (lxl = {}));
//# sourceMappingURL=Tool.js.map