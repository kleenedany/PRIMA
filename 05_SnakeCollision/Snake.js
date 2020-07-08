"use strict";
var SnakeCollision;
(function (SnakeCollision) {
    var f = FudgeCore;
    class Snake extends f.Node {
        constructor() {
            super("Snake");
            this.direction = f.Vector3.X();
            console.log("Creating Snake");
            this.createSegment(4);
        }
        move() {
            let child = this.getChildren()[0];
            let cmpPrev = child.getComponent(f.ComponentTransform); // Andere Möglichkeit: child.cmpTransform;
            let mtxHead = cmpPrev.local.copy;
            mtxHead.translate(this.direction);
            let cmpNew = new f.ComponentTransform(mtxHead);
            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(f.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
            return mtxHead;
        }
        /* public grow(): void {
             
         } */
        createSegment(_segments) {
            let mesh = new f.MeshQuad();
            let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
            for (let i = 0; i < _segments; i++) {
                let nodeSegment = new f.Node("Segment");
                let cmpMesh = new f.ComponentMesh(mesh);
                nodeSegment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(new f.Vector3(0.9, 0.9, 0.9));
                let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
                nodeSegment.addComponent(cmpMaterial);
                let cmpTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-1 * i, 0, 0)));
                nodeSegment.addComponent(cmpTransform);
                this.appendChild(nodeSegment);
            }
        }
    }
    SnakeCollision.Snake = Snake;
})(SnakeCollision || (SnakeCollision = {}));
//# sourceMappingURL=Snake.js.map