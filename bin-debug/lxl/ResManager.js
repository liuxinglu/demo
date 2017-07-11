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
    var ResManager = (function (_super) {
        __extends(ResManager, _super);
        function ResManager() {
            return _super.call(this) || this;
        }
        /**
         * 加载配置文件并解析
         */
        ResManager.prototype.loadConfig = function (url, resourceRoot) {
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this._configComplete, this);
            RES.loadConfig(url, resourceRoot);
        };
        ResManager.prototype._configComplete = function (e) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this._configComplete, this);
            this.dispatch(new lxl.CEvent(lxl.CEvent.LOAD_CONFIG_COMPLETE, e));
        };
        /**
         * 加载一组资源
         */
        ResManager.prototype.loadGroup = function (group) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this._onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this._onItemLoadError, this);
            RES.loadGroup(group);
        };
        ResManager.prototype._onResourceLoadComplete = function (e) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this._onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this._onItemLoadError, this);
            this.dispatch(new lxl.CEvent(lxl.CEvent.LOAD_GROUP_COMPLETE, e));
        };
        ResManager.prototype.getRes = function (resName) {
            return RES.getRes(resName);
        };
        /**
         * 异步获取配置文件
         */
        ResManager.prototype.getResAsync = function (resName, cb, ctx) {
            RES.getResAsync(resName, cb, ctx);
        };
        ResManager.prototype.getResByUrl = function (resName, cb, ctx, resType) {
            // RES.getResByUrl(resName, cb, ctx, resType);
            var loader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, cb, ctx);
            loader.dataFormat = resType;
            var request = new egret.URLRequest(resName);
            loader.load(request);
        };
        ResManager.prototype._onResourceLoadError = function (e) {
            lxl.logs.log("Group:" + e.groupName + "加载失败");
            this._onResourceLoadComplete(e);
        };
        ResManager.prototype._onItemLoadError = function (e) {
            lxl.logs.log("URL:" + e.resItem.url + " 加载出错");
        };
        ResManager.prototype._onResourceProgress = function (e) {
            this.dispatch(new lxl.CEvent(lxl.CEvent.LOAD_PROGRESS, e));
        };
        /**
         * 同步获取序列帧动画
         *  */
        ResManager.prototype.getMovieClip = function (jsonName, pngName, mcName) {
            var data = RES.getRes(jsonName);
            var tex = RES.getRes(pngName);
            var mcf = new egret.MovieClipDataFactory(data, tex);
            var mc = new egret.MovieClip(mcf.generateMovieClipData(mcName));
            return mc;
        };
        /**
         * 异步获取序列帧动画
         */
        ResManager.prototype.getMovieClipAsync = function (jsonName, pngName, mcName, callback, ctx) {
            var count = 0;
            var mcTexture;
            var mcData;
            var mc;
            var check = function () {
                count++;
                if (count == 2) {
                    var mcf = new egret.MovieClipDataFactory(mcData, mcTexture);
                    mc = new egret.MovieClip(mcf.generateMovieClipData(mcName));
                    callback.call(ctx, mc);
                }
            };
            this.getResByUrl(lxl.Config.MC_PATH + pngName, function (e) {
                mcTexture = e.currentTarget.data;
                check();
            }, this, egret.URLLoaderDataFormat.TEXTURE);
            this.getResByUrl(lxl.Config.MC_PATH + pngName, function (e) {
                mcData = JSON.parse(e.currentTarget.data);
                check();
            }, this, egret.URLLoaderDataFormat.TEXT);
        };
        return ResManager;
    }(lxl.CDispatcher));
    lxl.ResManager = ResManager;
    __reflect(ResManager.prototype, "lxl.ResManager");
})(lxl || (lxl = {}));
//# sourceMappingURL=ResManager.js.map