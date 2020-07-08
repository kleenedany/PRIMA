"use strict";
var SnakeEating;
(function (SnakeEating) {
    var f = FudgeCore;
    class Food extends f.Node {
        constructor() {
            super("Food");
            this.createFood(1);
        }
        createFood(_food) {
            let nodeFood = new f.Node("Apple");
            let mtrSolidFireBrick = new f.Material("SolidFireBrick", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("FIREBRICK")));
            let meshFood = new f.MeshQuad();
            for (let i = 0; i < _food; i++) {
                let cmpMaterialFireBrick = new f.ComponentMaterial(mtrSolidFireBrick);
                nodeFood.addComponent(cmpMaterialFireBrick);
                let cmpFood = new f.ComponentMesh(meshFood);
                nodeFood.addComponent(cmpFood);
                let cmpTransformFood = new f.ComponentTransform();
                nodeFood.addComponent(cmpTransformFood);
            }
        }
    }
    SnakeEating.Food = Food;
})(SnakeEating || (SnakeEating = {}));
//# sourceMappingURL=Food.js.map