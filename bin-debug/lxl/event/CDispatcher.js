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
    var CDispatcher = (function (_super) {
        __extends(CDispatcher, _super);
        function CDispatcher() {
            return _super.call(this) || this;
        }
        CDispatcher.getInstance = function () {
            if (this._instance == null)
                this._instance = new CDispatcher();
            return this._instance;
        };
        CDispatcher.prototype.addListener = function (type, listener, ctx, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            this.addEventListener(type, listener, ctx, useCapture, priority);
        };
        CDispatcher.prototype.removeListener = function (type, listener, ctx, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.removeEventListener(type, listener, ctx, useCapture);
        };
        CDispatcher.prototype.dispatch = function (event) {
            return this.dispatchEvent(event);
        };
        CDispatcher.prototype.hasListener = function (type) {
            return this.hasEventListener(type);
        };
        CDispatcher.prototype.willTrigger = function (type) {
            return this.willTrigger(type);
        };
        CDispatcher.prototype.once = function (type, listener, thisObject, useCapture, priority) {
            return this.once(type, listener, thisObject, useCapture, priority);
        };
        return CDispatcher;
    }(egret.EventDispatcher));
    lxl.CDispatcher = CDispatcher;
    __reflect(CDispatcher.prototype, "lxl.CDispatcher");
})(lxl || (lxl = {}));
//# sourceMappingURL=CDispatcher.js.map