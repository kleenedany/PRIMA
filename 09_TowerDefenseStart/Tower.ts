namespace TowerDefenseStart {
    import f = FudgeCore;

    export class Tower extends f.Node {

        public headNode: f.Node;
        public gunNode: f.Node;

        constructor() {
            super("Tower");
            console.log("creating Tower");

            let mtrSolidGrey: f.Material = new f.Material("SolidGrey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GREY")));
            let mtrSolidDimgrey: f.Material = new f.Material("SolidDimgrey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("DIMGREY")));
            let meshPyramid: f.MeshPyramid = new f.MeshPyramid();
            let meshSphere: f.MeshSphere = new f.MeshSphere(12, 8);
            let meshGun: f.MeshCube = new f.MeshCube();

           
            let pyramidNode: f.Node;
            pyramidNode = this.createNode("Pyramid", meshPyramid, mtrSolidGrey, new f.Vector3(0, 0, 0), new f.Vector3(1, 1, 1), new f.Vector3(90, 0, 0));
          
            this.headNode = this.createNode("Head", meshSphere, mtrSolidDimgrey, new f.Vector3(0, 0, 0.9), new f.Vector3(1, 1, 1), new f.Vector3(0, 0, 0));

            //let gunNode: f.Node;
            this.gunNode = this.createNode("Gun", meshGun, mtrSolidGrey, new f.Vector3(0, -0.5, 0.2), new f.Vector3(0.1, 0.5, 0.1), new f.Vector3(0, 0, 0));


            this.headNode.appendChild(this.gunNode);
            this.appendChild(this.headNode);
            this.appendChild(pyramidNode);
           
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