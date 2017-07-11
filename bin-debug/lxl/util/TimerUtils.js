var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var TimerUtils = (function () {
        function TimerUtils() {
        }
        TimerUtils.formatTimeBySecond = function (s) {
            var str = "";
            var min = Math.floor(s / 60);
            var sec = s % 60;
            str = this.formatMinite(min) + ":" + this.formatSecond(sec);
            return str;
        };
        TimerUtils.formatMinite = function (min) {
            var str = "";
            if (min < 10) {
                str = "0" + min;
                return str;
            }
            else if (min < 60) {
                str = "" + min;
                return str;
            }
            return str;
        };
        TimerUtils.formatSecond = function (sec) {
            var str = "";
            if (sec < 10) {
                str = "0" + sec;
                return str;
            }
            else if (sec <= 59) {
                str = "" + sec;
                return str;
            }
            return str;
        };
        return TimerUtils;
    }());
    lxl.TimerUtils = TimerUtils;
    __reflect(TimerUtils.prototype, "lxl.TimerUtils");
})(lxl || (lxl = {}));
//# sourceMappingURL=TimerUtils.js.map