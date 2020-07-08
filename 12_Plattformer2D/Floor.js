"use strict";
var Plattformer2D;
(function (Plattformer2D) {
    var f = FudgeCore;
    class Floor extends f.Node {
        constructor() {
            super("Floor");
            let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("green")));
        }
    }
    Plattformer2D.Floor = Floor;
})(Plattformer2D || (Plattformer2D = {}));
//# sourceMappingURL=Floor.js.map