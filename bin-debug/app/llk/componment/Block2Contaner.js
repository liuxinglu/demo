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
    var Block2Contaner = (function (_super) {
        __extends(Block2Contaner, _super);
        function Block2Contaner() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "Block2Contaner.exml") || this;
            _this._countArr = [];
            return _this;
        }
        Block2Contaner.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.update();
        };
        Block2Contaner.prototype.update = function () {
            var arr = Llk.getBlockData(2);
            var index = 0;
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 5; j++) {
                    this["b2" + i + "_" + j].onActivity();
                    this["b2" + i + "_" + j].num = arr[index++];
                    if (this["b2" + i + "_" + j].hasEventListener(lxl.CEvent.CLICK))
                        break;
                    this["b2" + i + "_" + j].addEventListener(lxl.CEvent.CLICK, this._blockClickHandler, this);
                }
        };
        Block2Contaner.prototype._checkAllInVisible = function () {
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 5; j++) {
                    if (this["b2" + i + "_" + j].visible == true)
                        return false;
                }
            return true;
        };
        Block2Contaner.prototype.reset = function () {
            var arr = Llk.getBlockData(2);
            var index = 0;
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 5; j++) {
                    this["b2" + i + "_" + j].visible = true;
                    this["b2" + i + "_" + j].alpha = 1;
                    this["b2" + i + "_" + j].num = arr[index++];
                }
        };
        Block2Contaner.prototype._blockClickHandler = function (e) {
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
        Block2Contaner.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 5; j++) {
                    this["b2" + i + "_" + j].removeEventListener(lxl.CEvent.CLICK, this._blockClickHandler, this);
                    this["b2" + i + "_" + j].dispose();
                }
        };
        return Block2Contaner;
    }(lxl.CComponent));
    app.Block2Contaner = Block2Contaner;
    __reflect(Block2Contaner.prototype, "app.Block2Contaner");
})(app || (app = {}));
//# sourceMappingURL=Block2Contaner.js.map