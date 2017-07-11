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
    var CComponent = (function (_super) {
        __extends(CComponent, _super);
        function CComponent(skinName) {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
            _this.skinName = lxl.Tool.callJS("getURL") + skinName;
            _this.funOnActivity = _this.onActivity;
            return _this;
        }
        CComponent.prototype.loadComplete = function () {
            var _this = this;
            egret.Tween.get(this).wait(0.1).call(function () {
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                _this.dispatchEvent(new egret.Event(lxl.CEvent.LOAD_SKIN_COMPLETE));
            }, this);
        };
        CComponent.prototype.onActivity = function () {
            for (var i = 0; i < this.numChildren; i++) {
                if (this.getChildAt(i).hasOwnProperty("funOnActivity"))
                    this.getChildAt(i)["funOnActivity"]();
            }
        };
        CComponent.prototype.dispose = function () {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
            this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
            for (var i = 0; i < this.numChildren; i++) {
                if (this.getChildAt(i).hasOwnProperty("dispose"))
                    this.getChildAt(i)["dispose"]();
            }
            this.parent.removeChild(this);
        };
        CComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        CComponent.prototype.removeChildByName = function (name) {
            this.removeChild(this.getChildByName(name));
        };
        /**
         * 在自己上面弹出
         */
        CComponent.prototype.pop = function (com) {
            var _this = this;
            com.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                com.anchorOffsetX = com.width / 2;
                com.anchorOffsetY = com.height / 2;
                com.x = _this.stage.stageWidth / 2;
                com.y = _this.stage.stageHeight / 2;
                _this.addChild(com);
            }, this);
        };
        return CComponent;
    }(eui.Component));
    lxl.CComponent = CComponent;
    __reflect(CComponent.prototype, "lxl.CComponent");
})(lxl || (lxl = {}));
//# sourceMappingURL=CComponent.js.map