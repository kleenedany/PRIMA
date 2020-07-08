"use strict";
var TowerDefenseStart;
(function (TowerDefenseStart) {
    var f = FudgeCore;
    class Tower extends f.Node {
        constructor() {
            super("Tower");
            console.log("creating Tower");
            let mtrSolidGrey = new f.Material("SolidGrey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GREY")));
            let mtrSolidDimgrey = new f.Material("SolidDimgrey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("DIMGREY")));
            let meshPyramid = new f.MeshPyramid();
            let meshSphere = new f.MeshSphere(12, 8);
            let meshGun = new f.MeshCube();
            let pyramidNode;
            pyramidNode = this.createNode("Pyramid", meshPyramid, mtrSolidGrey, new f.Vector3(0, 0, 0), new f.Vector3(1, 1, 1), new f.Vector3(90, 0, 0));
            this.headNode = this.createNode("Head", meshSphere, mtrSolidDimgrey, new f.Vector3(0, 0, 0.9), new f.Vector3(1, 1, 1), new f.Vector3(0, 0, 0));
            //let gunNode: f.Node;
            this.gunNode = this.createNode("Gun", meshGun, mtrSolidGrey, new f.Vector3(0, -0.5, 0.2), new f.Vector3(0.1, 0.5, 0.1), new f.Vector3(0, 0, 0));
            this.headNode.appendChild(this.gunNode);
            this.appendChild(this.headNode);
            this.appendChild(pyramidNode);
        }
        createNode(_name, _mesh, _material, _translation, _scaling, _rotation) {
            let node = new f.Node(_name);
            node.addComponent(new f.ComponentTransform);
            node.addComponent(new f.ComponentMaterial(_material));
            node.addComponent(new f.ComponentMesh(_mesh));
            node.cmpTransform.local.translate(_translation);
            node.getComponent(f.ComponentMesh).pivot.scale(_scaling);
            node.getComponent(f.ComponentMesh).pivot.rotate(_rotation);
            return node;
        }
    }
    TowerDefenseStart.Tower = Tower;
})(TowerDefenseStart || (TowerDefenseStart = {}));
//# sourceMappingURL=Tower.js.map