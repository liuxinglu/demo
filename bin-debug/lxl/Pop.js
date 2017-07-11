var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxl;
(function (lxl) {
    var Pops = (function (_super) {
        __extends(Pops, _super);
        function Pops() {
            var _this = _super.call(this) || this;
            _this._w = 0;
            _this._h = 0;
            return _this;
        }
        Pops.prototype.setSize = function (w, h) {
            this._w = w;
            this._h = h;
        };
        Pops.prototype.animation = function () {
            var _this = this;
            egret.Tween.get(this)
                .to({ alpha: 1 }, 800, egret.Ease.quintOut)
                .wait(1600)
                .to({ alpha: 0 }, 1000, egret.Ease.quintIn).call(function () {
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            });
        };
        Pops.prototype.init = function (cont, txtrToastBg) {
            this._cont = cont;
            this._txtrToastBg = txtrToastBg;
        };
        return Pops;
    }(egret.DisplayObjectContainer));
    lxl.Pops = Pops;
    __reflect(Pops.prototype, "lxl.Pops");
    var Toast = (function (_super) {
        __extends(Toast, _super);
        function Toast() {
            return _super.call(this) || this;
        }
        Toast.prototype.init = function (cont, txtrToastBg) {
            _super.prototype.init.call(this, cont, txtrToastBg);
            this._bg = new egret.Bitmap(this._txtrToastBg);
            this._bg.height = 35;
            this._bg.anchorOffsetX = this._bg.width / 2;
            this._bg.anchorOffsetY = this._bg.height / 2;
            this._tx = new egret.TextField;
            this._tx.size = 20;
            this._tx.bold = true;
            this._tx.textColor = 0xFFFFFF;
            this._tx.stroke = 2;
            this._tx.strokeColor = 0;
            this._tx.fontFamily = "微软雅黑";
            this._tx.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this._bg);
            this.addChild(this._tx);
        };
        Toast.prototype.inits = function (msg) {
            if (msg === void 0) { msg = ""; }
            this._tx.text = msg;
            this._tx.height = 30;
            this._tx.width = this._w;
            this._tx.anchorOffsetX = this._w / 2;
            this._tx.anchorOffsetY = this._tx.height / 2;
            this._bg.x = this.stage.stageWidth / 2;
            this._bg.y = this.stage.stageHeight / 2;
            this._tx.x = this._bg.x;
            this._tx.y = this._bg.y;
            this.alpha = 1;
        };
        Toast.prototype.launch = function (msg, ani) {
            if (ani === void 0) { ani = true; }
            if (this._cont) {
                this.setSize(this._cont.stage.stageWidth, this._cont.stage.stageHeight);
                this._cont.addChild(this);
                this.inits(msg);
                if (ani)
                    this.animation();
            }
        };
        Toast.getInstance = function () {
            if (this._t == null)
                this._t = new Toast();
            return this._t;
        };
        return Toast;
    }(Pops));
    lxl.Toast = Toast;
    __reflect(Toast.prototype, "lxl.Toast");
})(lxl || (lxl = {}));
//# sourceMappingURL=Pop.js.map