"use strict";
var TowerDefenseStart;
(function (TowerDefenseStart) {
    var f = FudgeCore;
    class Enemy extends f.Node {
        constructor() {
            super("Enemy");
            console.log("Creating Enemy");
            let mtrSolidOlive = new f.Material("SolidOlive", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("saddlebrown")));
            let mtrSolidGrey = new f.Material("SolidGrey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("black")));
            let meshCube = new f.MeshCube();
            let meshSphere = new f.MeshSphere();
            //let tankNode: f.Node;
            this.tankNode = this.createNode("TankBottom", meshCube, mtrSolidOlive, new f.Vector3(0, -1, 0), new f.Vector3(0.5, 0.5, 0.5), new f.Vector3(0, 0, 0));
            this.appendChild(this.tankNode);
            let tankTop;
            tankTop = this.createNode("TankTop", meshSphere, mtrSolidGrey, new f.Vector3(0, -1, 0.25), new f.Vector3(0.4, 0.4, 0.4), new f.Vector3(0, 0, 0));
            this.appendChild(tankTop);
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
    TowerDefenseStart.Enemy = Enemy;
})(TowerDefenseStart || (TowerDefenseStart = {}));
//# sourceMappingURL=Enemy.js.map