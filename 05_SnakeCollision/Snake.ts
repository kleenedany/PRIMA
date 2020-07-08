 namespace SnakeCollision {
    import f = FudgeCore;

    export class Snake extends f.Node {
        public direction: f.Vector3 = f.Vector3.X();
      

        constructor() {
            super("Snake");
            console.log("Creating Snake");
            this.createSegment(4);
        }

        public move(): f.Matrix4x4 {
            let child: f.Node = this.getChildren()[0];
            let cmpPrev: f.ComponentTransform = child.getComponent(f.ComponentTransform); // Andere Möglichkeit: child.cmpTransform;
            let mtxHead: f.Matrix4x4 = cmpPrev.local.copy;
            mtxHead.translate(this.direction);
            
            let  cmpNew: f.ComponentTransform = new f.ComponentTransform(mtxHead);

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

        private createSegment(_segments: number): void {
            let mesh: f.MeshQuad = new f.MeshQuad();
            let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
            
            for (let i: number = 0; i < _segments; i++) {
                let nodeSegment: f.Node = new f.Node("Segment");

                let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
                nodeSegment.addComponent(cmpMesh);
                cmpMesh.pivot.scale(new f.Vector3(0.9, 0.9, 0.9));
            
                let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
                nodeSegment.addComponent(cmpMaterial);
        
                let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-1 * i, 0, 0)));
                nodeSegment.addComponent(cmpTransform);

                this.appendChild(nodeSegment);
            }
        }
    }
}