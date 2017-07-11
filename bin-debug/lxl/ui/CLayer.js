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
    var ui;
    (function (ui) {
        var CLayer = (function (_super) {
            __extends(CLayer, _super);
            function CLayer() {
                var _this = _super.call(this) || this;
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                _this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, _this.dispose, _this);
                return _this;
            }
            CLayer.prototype.onActivity = function () {
            };
            CLayer.prototype.dispose = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    if (this.getChildAt(i).hasOwnProperty("dispose"))
                        this.getChildAt(i)["dispose"]();
                }
                this.parent.removeChild(this);
            };
            CLayer.prototype.pop = function (com) {
                var _this = this;
                com.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                    com.anchorOffsetX = com.width / 2;
                    com.anchorOffsetY = com.height / 2;
                    com.x = _this.stage.stageWidth / 2;
                    com.y = _this.stage.stageHeight / 2;
                    _this.addChild(com);
                }, this);
                this.addChild(com);
            };
            CLayer.prototype.removeChildByName = function (name) {
                this.removeChild(this.getChildByName(name));
            };
            return CLayer;
        }(eui.UILayer));
        ui.CLayer = CLayer;
        __reflect(CLayer.prototype, "lxl.ui.CLayer");
    })(ui = lxl.ui || (lxl.ui = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=CLayer.js.map