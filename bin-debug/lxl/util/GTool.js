var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl;
(function (lxl) {
    var GTool = (function () {
        function GTool() {
        }
        /**
         * 带箭头的线
         */
        GTool.drawArrowWithVector = function (g, pnt1, pnt2) {
            //箭头长度
            var len = 10;
            //箭头与直线的夹角
            var _a = 30;
            var x1 = pnt1.x;
            var y1 = pnt1.y;
            var x2 = pnt2.x;
            var y2 = pnt2.y;
            var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
            g.lineStyle(5, 0xff5566);
            g.moveTo(x2, y2);
            g.lineTo(x2 + len * Math.cos((angle - _a) * (Math.PI / 180)), y2 + len * Math.sin((angle - _a) * (Math.PI / 180)));
            g.moveTo(x2, y2);
            g.lineTo(x2 + len * Math.cos((angle + _a) * (Math.PI / 180)), y2 + len * Math.sin((angle + _a) * (Math.PI / 180)));
            g.moveTo(x1, y1);
            g.lineTo(x2, y2);
        };
        /**
         * color 填充色
         * r 半径
         * pnt 圆心
         * pntAngle 旋转角度所在点
         */
        GTool.drawFan = function (g, color, r, pnt, pntAngle) {
            // g.beginFill(color,50);
            // g.lineStyle(0,0xff0000);
            // g.moveTo(pnt.x, pnt.y);
            // let angle = pnt
            // angle=(Math.abs(angle)>360)?360:angle;
            // var n:Number=Math.ceil(Math.abs(angle)/45);
            // var angleA:Number=angle/n;
            // angleA=angleA*Math.PI/180;
            // startFrom=startFrom*Math.PI/180;
            // g.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
            // for (var i=1; i<=n; i++) {
            // 	startFrom+=angleA;
            // 	var angleMid=startFrom-angleA/2;
            // 	var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
            // 	var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
            // 	var cx=x+r*Math.cos(startFrom);
            // 	var cy=y+r*Math.sin(startFrom);
            // 	g.curveTo(bx,by,cx,cy);
            // }
            // if (angle!=360) {
            // 	g.lineTo(x,y);
            // }
            // g.endFill();
        };
        return GTool;
    }());
    lxl.GTool = GTool;
    __reflect(GTool.prototype, "lxl.GTool");
})(lxl || (lxl = {}));
//# sourceMappingURL=GTool.js.map