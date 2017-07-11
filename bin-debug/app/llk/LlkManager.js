var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var LlkManager = (function () {
        function LlkManager() {
            this._arr1 = [1, 2, 3, 4, 5];
            this._arr2 = [9, 8, 7, 6, 5];
            this.timeArr = [30, 60, 100];
            this.curLevel = 0; //0-2
            this.curTimes = "";
            this.usedTimes = 0;
        }
        LlkManager.prototype.getBlockData = function (block) {
            var arr = [];
            var count = 12;
            if (block == 1)
                count = 12;
            else if (block == 2)
                count = 20;
            else if (block == 3)
                count = 30;
            for (var i = 0; i < count / 2; i++) {
                var index = 0;
                if (i != 0) {
                    index = i % this._arr1.length == 0 ? this._arr1.length - 1 : i % this._arr1.length;
                    arr.push(this._arr1[index]);
                    arr.push(this._arr2[index]);
                }
                else {
                    arr.push(this._arr1[0]);
                    arr.push(this._arr2[0]);
                }
            }
            arr.sort(function (a, b) {
                return a + 5 - b;
            });
            arr = lxl.MathUtil.getRandomArrBySortArr(arr);
            return arr;
        };
        LlkManager.getInstance = function () {
            if (this._instance == null)
                this._instance = new LlkManager();
            return this._instance;
        };
        return LlkManager;
    }());
    app.LlkManager = LlkManager;
    __reflect(LlkManager.prototype, "app.LlkManager");
})(app || (app = {}));
//# sourceMappingURL=LlkManager.js.map