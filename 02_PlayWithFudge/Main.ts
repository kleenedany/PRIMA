namespace PlayWithFudge {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    let viewport: f.Viewport;
    let nodeRoot: f.Node;
    let nodeQuad: f.Node;
    let nodeCube: f.Node;
    let nodePyramid: f.Node;
    let nodeSphere: f.Node;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        nodeRoot = new f.Node("Root");
        nodeQuad = new f.Node("Quad");
        nodeCube = new f.Node("Cube");
        nodePyramid = new f.Node("Pyramid");
        nodeSphere = new f.Node("Sphere");


        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let mtrSolidFireBrick: f.Material = new f.Material("SolidFireBrick", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("FIREBRICK")));
        let mtrSolidGold: f.Material = new f.Material("SolidGold", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GOLD")));
        let mtrSolidLimeGreen: f.Material = new f.Material("SolidLimeGreen", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("LIMEGREEN")));


        let meshQuad: f.MeshQuad = new f.MeshQuad();
        let cmpMeshQuad: f.ComponentMesh = new f.ComponentMesh(meshQuad);
        nodeQuad.addComponent(cmpMeshQuad);

        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        nodeQuad.addComponent(cmpMaterial);

        let cmpTransformQuad: f.ComponentTransform = new f.ComponentTransform();
        nodeQuad.addComponent(cmpTransformQuad);
        nodeQuad.mtxLocal.translate(new f.Vector3(-5, 2, 0));
        nodeQuad.mtxLocal.scale(new f.Vector3(0.25, 0.25, 0.25));


        let meshCube: f.MeshCube = new f.MeshCube();
        let cmpMeshCube: f.ComponentMesh = new f.ComponentMesh(meshCube);
        nodeCube.addComponent(cmpMeshCube);

        let cmpMaterialFireBrick: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidFireBrick);
        nodeCube.addComponent(cmpMaterialFireBrick);

        let cmpTransformCube: f.ComponentTransform = new f.ComponentTransform();
        nodeCube.addComponent(cmpTransformCube);
        nodeCube.mtxLocal.translateX(-2.5);
        nodeCube.mtxLocal.scale(new f.Vector3(2,2,2));


        let meshPyramid: f.MeshPyramid = new f.MeshPyramid();
        let cmpMeshPyramid: f.ComponentMesh = new f.ComponentMesh(meshPyramid);
        nodePyramid.addComponent(cmpMeshPyramid);

        let cmpMaterialGold: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidGold);
        nodePyramid.addComponent(cmpMaterialGold);

        let cmpTransformPyramid: f.ComponentTransform = new f.ComponentTransform();
        nodePyramid.addComponent(cmpTransformPyramid);
        nodePyramid.mtxLocal.translate(new f.Vector3(5, 1, -5));
        nodePyramid.mtxLocal.scale(new f.Vector3(1.5, 1.5, 1.5));


        let meshSphere: f.MeshSphere = new f.MeshSphere();
        let cmpMeshSphere: f.ComponentMesh = new f.ComponentMesh(meshSphere);
        nodeSphere.addComponent(cmpMeshSphere);

        let cmpMaterialLimeGreen: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidLimeGreen);
        nodeSphere.addComponent(cmpMaterialLimeGreen);

        let cmpTransformSphere: f.ComponentTransform = new f.ComponentTransform();
        nodeSphere.addComponent(cmpTransformSphere);
        nodeSphere.mtxLocal.translate(new f.Vector3(5, -2, 0));
        nodeSphere.mtxLocal.scale(new f.Vector3(0.5, 0.5, 0.5));

        nodeRoot.appendChild(nodeQuad);
        nodeRoot.appendChild(nodeCube);
        nodeRoot.appendChild(nodePyramid);
        nodeRoot.appendChild(nodeSphere);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", nodeRoot, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }  

    function update(_event: Event): void {
        nodeCube.mtxLocal.rotateY(0.5);
        nodeCube.mtxLocal.rotateX(0.25);

        nodePyramid.mtxLocal.rotateY(-0.25);
        nodePyramid.mtxLocal.rotateX(-0.5);

        if(nodeSphere.mtxLocal.translation.x > -5){
            nodeSphere.mtxLocal.translateX(-0.1);
        }
        
        if(nodeQuad.mtxLocal.translation.x < 5){
            nodeQuad.mtxLocal.translateX(0.08);
        }


        viewport.draw();
    }
}