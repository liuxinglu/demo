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
    var data;
    (function (data) {
        var BaseData = (function (_super) {
            __extends(BaseData, _super);
            function BaseData() {
                var _this = _super.call(this) || this;
                _this.str = new egret.ByteArray();
                _this.arr = [];
                return _this;
            }
            return BaseData;
        }(Object));
        data.BaseData = BaseData;
        __reflect(BaseData.prototype, "lxl.data.BaseData");
        var Map = (function () {
            function Map() {
            }
            return Map;
        }());
        data.Map = Map;
        __reflect(Map.prototype, "lxl.data.Map");
    })(data = lxl.data || (lxl.data = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=BaseData.js.map