var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var data;
    (function (data) {
        var PackageOut = (function () {
            function PackageOut(code) {
                this._code = code;
                this._o = new data.BaseData();
            }
            PackageOut.prototype.writeString = function (str) {
                if (str == null) {
                    this._o.str.writeUTF("");
                }
                else {
                    this._o.str.writeUTFBytes(str);
                }
            };
            PackageOut.prototype.writeArray = function (arr) {
                if (arr.length > 0)
                    this._o.arr = arr;
            };
            PackageOut.prototype.getParamLen = function () {
                return this._o.arr.length;
            };
            PackageOut.prototype.getParamByIndex = function (index) {
                if (index >= 0) {
                    return this._o.arr[index];
                }
                else {
                    return 0;
                }
            };
            PackageOut.prototype.getParam = function () {
                return this._o.arr;
            };
            PackageOut.prototype.code = function () {
                return this._code;
            };
            PackageOut.prototype.getFullUrl = function () {
                return "";
            };
            return PackageOut;
        }());
        data.PackageOut = PackageOut;
        __reflect(PackageOut.prototype, "lxl.data.PackageOut", ["lxl.interfaces.IPackageOut"]);
    })(data = lxl.data || (lxl.data = {}));
})(lxl || (lxl = {}));
//# sourceMappingURL=PackageOut.js.map