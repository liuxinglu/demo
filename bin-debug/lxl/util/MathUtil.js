var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**
         * 获取一个数组中除数组元素以外的一个随机值
         * 如：【9，2，1】得到的是比9小 并且不等于9 2 1的一个随机值
         */
        MathUtil.getRandomNumByArr = function (arr) {
            arr.sort(function (a, b) {
                return b - a;
            });
            var randomArr = [];
            for (var i = 0; i < arr[0] / 10; i = i / 10) {
                i = (++i) * 10;
                var flag = true;
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j] == i) {
                        flag = false;
                    }
                }
                if (flag == true)
                    randomArr.push(i);
            }
            var pos = Math.floor(randomArr.length * Math.random()) - 1;
            if (pos < 0)
                pos = 0;
            if (randomArr.length == 0)
                return 10;
            return randomArr[pos];
        };
        /**
         * 将有序数列打散成无序数列
         * 如12345打成31452
         */
        MathUtil.getRandomArrBySortArr = function (arr) {
            var randomArr = [];
            var rand = Math.random();
            if (rand > 0.5) {
                for (var i = arr.length - 1; i > arr.length / 2; i--) {
                    randomArr.push(arr[i]);
                }
                for (var i = arr.length / 2; i >= 0; i--) {
                    randomArr.push(arr[i]);
                }
                for (var i = 5; i < arr.length / 2 + 5; i++) {
                    var temp = randomArr[i];
                    randomArr[i] = randomArr[randomArr.length / 2 + 5 - i];
                    randomArr[randomArr.length / 2 + 5 - i] = temp;
                }
                for (var i = arr.length / 2 - 5; i < arr.length; i++) {
                    var temp = randomArr[i];
                    randomArr[i] = randomArr[randomArr.length - i];
                    randomArr[randomArr.length - i] = temp;
                }
                for (var i = 0; i < arr.length / 2; i++) {
                    var temp = randomArr[i];
                    randomArr[i] = randomArr[randomArr.length / 2 - i];
                    randomArr[randomArr.length / 2 - i] = temp;
                }
            }
            else {
                for (var i = arr.length / 2; i >= 0; i--) {
                    randomArr.push(arr[i]);
                }
                for (var i = arr.length - 1; i > arr.length / 2; i--) {
                    randomArr.push(arr[i]);
                }
                for (var i = 0; i < arr.length - 4; i++) {
                    var index = Math.floor(Math.random() * 10);
                    var temp = randomArr[index];
                    randomArr[index] = randomArr[index + 2];
                    randomArr[index + 2] = temp;
                }
                for (var i = 4; i < arr.length; i++) {
                    var temp = randomArr[i];
                    randomArr[i] = randomArr[randomArr.length - i];
                    randomArr[randomArr.length - i] = temp;
                }
                for (var i = arr.length / 2 - 5; i < arr.length; i++) {
                    var temp = randomArr[i];
                    randomArr[i] = randomArr[randomArr.length - i];
                    randomArr[randomArr.length - i] = temp;
                }
            }
            for (var i = 0; i < arr.length - 1; i++) {
                var index = Math.floor(Math.random() * 10);
                var temp = randomArr[index];
                randomArr[index] = randomArr[index + 2];
                randomArr[index + 2] = temp;
            }
            for (var i = 1; i < 3; i++) {
                var temp = randomArr[i];
                randomArr[i] = randomArr[randomArr.length - i];
                randomArr[randomArr.length - i] = temp;
            }
            return randomArr;
        };
        /**
         * 通过两点确定向量所在方位1-12
         */
        MathUtil.getPointDir = function (mouseData) {
            var len = mouseData.length;
            var dirsArr = [];
            for (var i = 0; i < len; i++) {
                if (mouseData[i + 1]) {
                    var p1 = mouseData[i];
                    var p2 = mouseData[i + 1];
                    var a = p1.y - p2.y;
                    var b = egret.Point.distance(p1, p2);
                    var rad = Math.asin(a / b);
                    var ang = rad * 57.2957800; // rad * 180/Math.PI 直接求常量，优化
                    var quad = this.quadrant(p1, p2);
                    var dir = this.getDirByAngQuad2(ang, quad);
                    dirsArr.push(dir);
                }
            }
            var dirstr = this.repDiff(dirsArr);
            return parseInt(dirstr);
        };
        /**
         * 通过一系列坐标点获得对应方向
         * // v 0
            // | 1向上
            // —2向右
            // ^ 3
            // 6 4
            // z 5
            // | 6向下
            // —7向左
         */
        MathUtil.parseGestureDir = function (mouseData) {
            var len = mouseData.length;
            var dirsArr = [];
            for (var i = 0; i < len; i++) {
                if (mouseData[i + 1]) {
                    var p1 = mouseData[i];
                    var p2 = mouseData[i + 1];
                    var a = p1.y - p2.y;
                    var b = egret.Point.distance(p1, p2);
                    var rad = Math.asin(a / b);
                    var ang = rad * 57.2957800; // rad * 180/Math.PI 直接求常量，优化
                    var quad = this.quadrant(p1, p2);
                    var dir = this.getDirByAngQuad(ang, quad);
                    dirsArr.push(dir);
                }
            }
            var dirstr = this.repDiff(dirsArr);
            var rel = this.sweep(dirstr);
            return rel;
        };
        /*
        对比去重
        */
        MathUtil.repDiff = function (data) {
            var str = "";
            var len = data.length;
            var currentType = 0;
            for (var i = 0; i < len; i++) {
                if (currentType != data[i]) {
                    currentType = data[i];
                    str += data[i];
                }
            }
            return str;
        };
        MathUtil.sweep = function (str) {
            var maxType = -1;
            var max = -1;
            var len = this._symbol.length;
            for (var i = 0; i < len; i++) {
                var val = this.Levenshtein_Distance_Percent(this._symbol[i], str);
                if (val > max) {
                    max = val;
                    maxType = this._symbolG[i];
                }
            }
            if (max < 0.4)
                maxType = -1;
            return maxType;
        };
        /*
        根据所在象限与角度计算出方向编号。
        方向编号，以第一象限0度为基础，按照顺时针方向，将圆等分为8份。
        */
        MathUtil.getDirByAngQuad = function (ang, quad) {
            switch (quad) {
                case 1:
                    if (ang <= 22.5 && ang >= 0) {
                        return 1;
                    }
                    else if (ang <= 67.5 && ang > 22.5) {
                        return 8;
                    }
                    else {
                        return 7;
                    }
                    break;
                case 2:
                    if (ang <= 22.5 && ang >= 0) {
                        return 5;
                    }
                    else if (ang <= 67.5 && ang > 22.5) {
                        return 6;
                    }
                    else {
                        return 7;
                    }
                    break;
                case 3:
                    if (ang <= -67.5 && ang >= -90) {
                        return 3;
                    }
                    else if (ang <= -22.5 && ang > -67.5) {
                        return 4;
                    }
                    else {
                        return 5;
                    }
                    break;
                case 4:
                    if (ang <= -67.5 && ang >= -90) {
                        return 3;
                    }
                    else if (ang <= -22.5 && ang > -67.5) {
                        return 2;
                    }
                    else {
                        return 1;
                    }
                    break;
            }
        };
        /*
        根据所在象限与角度计算出方向编号。
        方向编号，以第一象限0度为基础，按照顺时针方向，将圆等分为12份。
        */
        MathUtil.getDirByAngQuad2 = function (ang, quad) {
            switch (quad) {
                case 1:
                    if (ang <= 30 && ang >= 0) {
                        return 3;
                    }
                    else if (ang <= 60 && ang > 30) {
                        return 2;
                    }
                    else {
                        return 1;
                    }
                    break;
                case 2:
                    if (ang <= 30 && ang >= 0) {
                        return 10;
                    }
                    else if (ang <= 60 && ang > 30) {
                        return 11;
                    }
                    else {
                        return 12;
                    }
                    break;
                case 3:
                    if (ang <= -60 && ang >= -90) {
                        return 7;
                    }
                    else if (ang <= -30 && ang > -60) {
                        return 8;
                    }
                    else {
                        return 9;
                    }
                    break;
                case 4:
                    if (ang <= -60 && ang >= -90) {
                        return 6;
                    }
                    else if (ang <= -30 && ang > -60) {
                        return 5;
                    }
                    else {
                        return 4;
                    }
                    break;
            }
        };
        /*
        计算两点关系所形成的象限
        以P1 作为坐标原点，P2为设定点，判断P2相对于P1时所在象限
        */
        MathUtil.quadrant = function (p1, p2) {
            if (p2.x >= p1.x) {
                if (p2.y <= p1.y) {
                    return 1;
                }
                else {
                    return 4;
                }
            }
            else {
                if (p2.y <= p1.y) {
                    return 2;
                }
                else {
                    return 3;
                }
            }
        };
        MathUtil.Levenshtein_Distance = function (s, t) {
            var n = s.length; // length of s
            var m = t.length; // length of t
            var d = []; // matrix
            var i; // iterates through s
            var j; // iterates through t
            var s_i; // ith character of s
            var t_j; // jth character of t
            var cost; // cost
            // Step 1
            if (n == 0)
                return m;
            if (m == 0)
                return n;
            // Step 2
            for (i = 0; i <= n; i++) {
                d[i] = [];
                d[i][0] = i;
            }
            for (j = 0; j <= m; j++) {
                d[0][j] = j;
            }
            // Step 3
            for (i = 1; i <= n; i++) {
                s_i = s.charAt(i - 1);
                // Step 4
                for (j = 1; j <= m; j++) {
                    t_j = t.charAt(j - 1);
                    // Step 5
                    if (s_i == t_j) {
                        cost = 0;
                    }
                    else {
                        cost = 1;
                    }
                    // Step 6
                    d[i][j] = this.Minimum(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
                }
            }
            // Step 7
            return d[n][m];
        };
        MathUtil.Levenshtein_Distance_Percent = function (s, t) {
            var l = s.length > t.length ? s.length : t.length;
            var d = this.Levenshtein_Distance(s, t);
            return (1 - d / l); //.toFixed(4);
        };
        MathUtil.Minimum = function (a, b, c) {
            return a < b ? (a < c ? a : c) : (b < c ? b : c);
        };
        return MathUtil;
    }());
    MathUtil._symbol = ["28", "46", "82", "64", "141", "585", "3", "7", "5", "1", "4321876", "2345678"];
    MathUtil._symbolG = [0, 0, 3, 3, 5, 5, 6, 1, 7, 2, 4, 4];
    lxl.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "lxl.MathUtil");
})(lxl || (lxl = {}));
//# sourceMappingURL=MathUtil.js.map