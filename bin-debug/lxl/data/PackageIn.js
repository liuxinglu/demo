var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var data;
    (function (data) {
        var PackageIn = (function () {
            function PackageIn(code, body) {
                this._code = code;
                this._o = new data.BaseData();
                this._o = body;
            }
            PackageIn.prototype.code = function () {
                return this._code;
            };
            PackageIn.prototype.readObj = function () {
                return this._o;
            };
            PackageIn.prototype.readObjStr = function () {
                var str = JSON.stringify(this._o);
                if (this._o.propertyIsEnumerable("")) {
                    for (var i in this._o) {
                        str.concat(i, this._o[i]);
                    }
                }
                return str;
            };
            return PackageIn;
        }());
        data.PackageIn = PackageIn;
        __reflect(PackageIn.prototype, "lxl.data.PackageIn", ["lxl.interfaces.IPackageIn"]);
    })(data = lxl.data || (lxl.data = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=PackageIn.js.map