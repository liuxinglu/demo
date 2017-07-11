var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var Block3Contaner = (function (_super) {
        __extends(Block3Contaner, _super);
        function Block3Contaner() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "Block3Contaner.exml") || this;
            _this._countArr = [];
            return _this;
        }
        Block3Contaner.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.update();
        };
        Block3Contaner.prototype.update = function () {
            var arr = Llk.getBlockData(3);
            var index = 0;
            for (var i = 0; i < 5; i++)
                for (var j = 0; j < 6; j++) {
                    this["b3" + i + "_" + j].onActivity();
                    this["b3" + i + "_" + j].num = arr[index++];
                    if (this["b3" + i + "_" + j].hasEventListener(lxl.CEvent.CLICK))
                        break;
                    this["b3" + i + "_" + j].addEventListener(lxl.CEvent.CLICK, this._blockClickHandler, this);
                }
        };
        Block3Contaner.prototype._checkAllInVisible = function () {
            for (var i = 0; i < 5; i++)
                for (var j = 0; j < 6; j++) {
                    if (this["b3" + i + "_" + j].visible == true)
                        return false;
                }
            return true;
        };
        Block3Contaner.prototype.reset = function () {
            var arr = Llk.getBlockData(3);
            var index = 0;
            for (var i = 0; i < 5; i++)
                for (var j = 0; j < 6; j++) {
                    this["b3" + i + "_" + j].visible = true;
                    this["b3" + i + "_" + j].alpha = 1;
                    this["b3" + i + "_" + j].num = arr[index++];
                }
        };
        Block3Contaner.prototype._blockClickHandler = function (e) {
            this._countArr.push(e.param);
            if (this._countArr.length == 2) {
                if (this._countArr[0].num + this._countArr[1].num == 10) {
                    this._countArr[0].visible = false;
                    this._countArr[1].visible = false;
                    this.dispatchEvent(new lxl.CEvent(lxl.CEvent.SUCCESS, 0));
                }
                else {
                    this._countArr[0].turnBack();
                    this._countArr[1].turnBack();
                }
                this._countArr.shift();
                this._countArr.shift();
                if (this._checkAllInVisible()) {
                    this.dispatchEvent(new lxl.CEvent(lxl.CEvent.SUCCESS, 1));
                }
            }
        };
        Block3Contaner.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            for (var i = 0; i < 5; i++)
                for (var j = 0; j < 6; j++) {
                    this["b3" + i + "_" + j].removeEventListener(lxl.CEvent.CLICK, this._blockClickHandler, this);
                    this["b3" + i + "_" + j].dispose();
                }
        };
        return Block3Contaner;
    }(lxl.CComponent));
    app.Block3Contaner = Block3Contaner;
    __reflect(Block3Contaner.prototype, "app.Block3Contaner");
})(app || (app = {}));
//# sourceMappingURL=Block3Contaner.js.map