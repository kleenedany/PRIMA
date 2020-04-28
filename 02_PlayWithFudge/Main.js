"use strict";
var PlayWithFudge;
(function (PlayWithFudge) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let nodeRoot;
    let nodeQuad;
    let nodeCube;
    let nodePyramid;
    let nodeSphere;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        nodeRoot = new f.Node("Root");
        nodeQuad = new f.Node("Quad");
        nodeCube = new f.Node("Cube");
        nodePyramid = new f.Node("Pyramid");
        nodeSphere = new f.Node("Sphere");
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let mtrSolidFireBrick = new f.Material("SolidFireBrick", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("FIREBRICK")));
        let mtrSolidGold = new f.Material("SolidGold", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GOLD")));
        let mtrSolidLimeGreen = new f.Material("SolidLimeGreen", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("LIMEGREEN")));
        let meshQuad = new f.MeshQuad();
        let cmpMeshQuad = new f.ComponentMesh(meshQuad);
        nodeQuad.addComponent(cmpMeshQuad);
        let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
        nodeQuad.addComponent(cmpMaterial);
        let cmpTransformQuad = new f.ComponentTransform();
        nodeQuad.addComponent(cmpTransformQuad);
        nodeQuad.mtxLocal.translate(new f.Vector3(-5, 2, 0));
        nodeQuad.mtxLocal.scale(new f.Vector3(0.25, 0.25, 0.25));
        let meshCube = new f.MeshCube();
        let cmpMeshCube = new f.ComponentMesh(meshCube);
        nodeCube.addComponent(cmpMeshCube);
        let cmpMaterialFireBrick = new f.ComponentMaterial(mtrSolidFireBrick);
        nodeCube.addComponent(cmpMaterialFireBrick);
        let cmpTransformCube = new f.ComponentTransform();
        nodeCube.addComponent(cmpTransformCube);
        nodeCube.mtxLocal.translateX(-2.5);
        nodeCube.mtxLocal.scale(new f.Vector3(2, 2, 2));
        let meshPyramid = new f.MeshPyramid();
        let cmpMeshPyramid = new f.ComponentMesh(meshPyramid);
        nodePyramid.addComponent(cmpMeshPyramid);
        let cmpMaterialGold = new f.ComponentMaterial(mtrSolidGold);
        nodePyramid.addComponent(cmpMaterialGold);
        let cmpTransformPyramid = new f.ComponentTransform();
        nodePyramid.addComponent(cmpTransformPyramid);
        nodePyramid.mtxLocal.translate(new f.Vector3(5, 1, -5));
        nodePyramid.mtxLocal.scale(new f.Vector3(1.5, 1.5, 1.5));
        let meshSphere = new f.MeshSphere();
        let cmpMeshSphere = new f.ComponentMesh(meshSphere);
        nodeSphere.addComponent(cmpMeshSphere);
        let cmpMaterialLimeGreen = new f.ComponentMaterial(mtrSolidLimeGreen);
        nodeSphere.addComponent(cmpMaterialLimeGreen);
        let cmpTransformSphere = new f.ComponentTransform();
        nodeSphere.addComponent(cmpTransformSphere);
        nodeSphere.mtxLocal.translate(new f.Vector3(5, -2, 0));
        nodeSphere.mtxLocal.scale(new f.Vector3(0.5, 0.5, 0.5));
        nodeRoot.appendChild(nodeQuad);
        nodeRoot.appendChild(nodeCube);
        nodeRoot.appendChild(nodePyramid);
        nodeRoot.appendChild(nodeSphere);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", nodeRoot, cmpCamera, canvas);
        f.Debug.log(viewport);
        viewport.draw();
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function update(_event) {
        nodeCube.mtxLocal.rotateY(0.5);
        nodeCube.mtxLocal.rotateX(0.25);
        nodePyramid.mtxLocal.rotateY(-0.25);
        nodePyramid.mtxLocal.rotateX(-0.5);
        if (nodeSphere.mtxLocal.translation.x > -5) {
            nodeSphere.mtxLocal.translateX(-0.1);
        }
        if (nodeQuad.mtxLocal.translation.x < 5) {
            nodeQuad.mtxLocal.translateX(0.08);
        }
        viewport.draw();
    }
})(PlayWithFudge || (PlayWithFudge = {}));
//# sourceMappingURL=Main.js.map