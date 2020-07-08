namespace SnakeEating {
    import f = FudgeCore;

    export class Food extends f.Node {

        constructor(){
            super("Food");
            this.createFood(1);
        }

        private createFood(_food: number): void {
            let nodeFood: f.Node = new f.Node("Apple");
            let mtrSolidFireBrick: f.Material = new f.Material("SolidFireBrick", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("FIREBRICK")));
            let meshFood: f.MeshQuad = new f.MeshQuad();

            for (let  i: number = 0; i < _food; i++) {
                let cmpMaterialFireBrick: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidFireBrick);
                nodeFood.addComponent(cmpMaterialFireBrick);
                let cmpFood: f.ComponentMesh = new f.ComponentMesh(meshFood);
                nodeFood.addComponent(cmpFood);
                let cmpTransformFood: f.ComponentTransform = new f.ComponentTransform();
                nodeFood.addComponent(cmpTransformFood);
            }
        }
    }

}