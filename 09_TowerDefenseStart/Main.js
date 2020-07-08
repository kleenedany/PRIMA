"use strict";
var TowerDefenseStart;
(function (TowerDefenseStart) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let viewport;
    let gameNode;
    let tower;
    let enemy;
    //let wayNode: f.Node;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        gameNode = new f.Node("Game");
        f.RenderManager.initialize();
        tower = new TowerDefenseStart.Tower();
        enemy = new TowerDefenseStart.Enemy();
        gameNode.appendChild(tower);
        gameNode.appendChild(enemy);
        gameNode.appendChild(createTerrain());
        // WAYPOINTS
        /* let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
         let meshCube: f.MeshCube = new f.MeshCube();
         
 
         for (let i: number = 0; i < 2; i++) {
             wayNode = new f.Node("Waypoint");
             wayNode.addComponent(new f.ComponentTransform);
             wayNode.addComponent(new f.ComponentMaterial(mtrSolidWhite));
             wayNode.addComponent(new f.ComponentMesh(meshCube));
             wayNode.cmpTransform.local.translateX(i * 4);
             wayNode.cmpTransform.local.translateY(2);
             wayNode.getComponent(f.ComponentMesh).pivot.scale(new f.Vector3(0.1, 0.1, 0.1));
             gameNode.appendChild(wayNode);
         }
 
         console.log("GAME NODE" + gameNode);
         console.log("WAY NODE" + wayNode); */
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(0, -10, 9));
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("lightblue");
        fAid.addStandardLightComponents(gameNode, new f.Color(0.5, 0.5, 0.5));
        // gameNode.addChild(new fAid.NodeCoordinateSystem());
        viewport = new f.Viewport();
        viewport.initialize("Viewport", gameNode, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
    }
    function update(_event) {
        //tower.headNode.cmpTransform.local.rotateZ(1);
        // enemy.tankNode.cmpTransform.local.translation = wayNode.cmpTransform.local.translation;
        //enemy.tankNode.cmpTransform.local.translateY(-0.1);
        //tower.headNode.cmpTransform.local.lookAt(enemy.tankNode.cmpTransform.local.translation);
        viewport.draw();
    }
    function createTerrain() {
        let meshQuad = new f.MeshQuad();
        let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("forestgreen")));
        let terrainNode = new f.Node("Terrain");
        let cmpMesh = new f.ComponentMesh(meshQuad);
        cmpMesh.pivot.scale(new f.Vector3(25, 16, 0));
        terrainNode.addComponent(cmpMesh);
        let cmpMaterial = new f.ComponentMaterial(mtrSolidGreen);
        terrainNode.addComponent(cmpMaterial);
        return terrainNode;
    }
})(TowerDefenseStart || (TowerDefenseStart = {}));
//# sourceMappingURL=Main.js.map