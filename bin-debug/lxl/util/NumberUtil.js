var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var NumberUtil = (function () {
        function NumberUtil() {
        }
        NumberUtil.getNumSp = function (num, qianzhui) {
            if (qianzhui === void 0) { qianzhui = ""; }
            var sp = new egret.Sprite();
            var arr = num.toString().split("");
            for (var i = 0; i < arr.length; i++) {
                var img = lxl.Tool.createBitmapByName(qianzhui + arr[i] + "_png");
                img.x = 17 * i;
                sp.addChild(img);
            }
            sp.width = 17 * arr.length;
            sp.height = 40;
            return sp;
        };
        return NumberUtil;
    }());
    lxl.NumberUtil = NumberUtil;
    __reflect(NumberUtil.prototype, "lxl.NumberUtil");
})(lxl || (lxl = {}));
//# sourceMappingURL=NumberUtil.js.map