namespace TowerDefenseStart {
    import f = FudgeCore;

    export class Enemy extends f.Node {

        public tankNode: f.Node;

        constructor(){
            super("Enemy");
            console.log("Creating Enemy");

            let mtrSolidOlive: f.Material = new f.Material("SolidOlive", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("saddlebrown")));
            let mtrSolidGrey: f.Material = new f.Material("SolidGrey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("black")));
            let meshCube: f.MeshCube = new f.MeshCube();
            let meshSphere: f.MeshSphere = new f.MeshSphere();

            //let tankNode: f.Node;
            this.tankNode = this.createNode("TankBottom", meshCube, mtrSolidOlive, new f.Vector3(0, -1, 0), new f.Vector3(0.5, 0.5, 0.5), new f.Vector3(0, 0, 0));
            this.appendChild(this.tankNode);

            let tankTop: f.Node;
            tankTop = this.createNode("TankTop", meshSphere, mtrSolidGrey, new f.Vector3(0, -1, 0.25), new f.Vector3(0.4, 0.4, 0.4), new f.Vector3(0, 0, 0));
            this.appendChild(tankTop);
        }

        private createNode(_name: string, _mesh: f.Mesh, _material: f.Material, _translation: f.Vector3, _scaling: f.Vector3, _rotation: f.Vector3): f.Node {
            let node: f.Node = new f.Node(_name);
            node.addComponent(new f.ComponentTransform);
            node.addComponent(new f.ComponentMaterial(_material));
            node.addComponent(new f.ComponentMesh(_mesh));
            node.cmpTransform.local.translate(_translation);
            node.getComponent(f.ComponentMesh).pivot.scale(_scaling);
            node.getComponent(f.ComponentMesh).pivot.rotate(_rotation);

            return node;
        }


    }
}