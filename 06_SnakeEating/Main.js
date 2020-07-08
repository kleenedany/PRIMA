"use strict";
var SnakeEating;
(function (SnakeEating) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    let testNode;
    let gameNode;
    let wallNode;
    let wallTopNode;
    let wallBottomNode;
    let wallLeftNode;
    let wallRightNode;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        gameNode = new f.Node("Root");
        snake = new SnakeEating.Snake();
        gameNode.appendChild(snake);
        wallNode = new f.Node("Wall");
        testNode = new f.Node("testObject");
        let mtrSolidFireBrick = new f.Material("SolidFireBrick", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("FIREBRICK")));
        let cmpMaterialFireBrick = new f.ComponentMaterial(mtrSolidFireBrick);
        testNode.addComponent(cmpMaterialFireBrick);
        let meshTest = new f.MeshQuad();
        let cmpTest = new f.ComponentMesh(meshTest);
        testNode.addComponent(cmpTest);
        let cmpTransformTest = new f.ComponentTransform();
        testNode.addComponent(cmpTransformTest);
        testNode.mtxLocal.translate(new f.Vector3(-6, 0, 0));
        cmpTest.pivot.scale(new f.Vector3(0.9, 0.9, 0.9));
        gameNode.appendChild(testNode);
        // WALL
        let meshWall = new f.MeshQuad();
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        wallBottomNode = createNode("wallBottom", meshWall, mtrSolidWhite, new f.Vector2(0, -9.5), new f.Vector2(32, 1));
        wallNode.appendChild(wallBottomNode);
        wallTopNode = createNode("wallTop", meshWall, mtrSolidWhite, new f.Vector2(0, 9.5), new f.Vector2(32, 1));
        wallNode.appendChild(wallTopNode);
        wallRightNode = createNode("wallRight", meshWall, mtrSolidWhite, new f.Vector2(15.5, 0), new f.Vector2(1, 20));
        wallNode.appendChild(wallRightNode);
        wallLeftNode = createNode("wallLeft", meshWall, mtrSolidWhite, new f.Vector2(-15.5, 0), new f.Vector2(1, 20));
        wallNode.appendChild(wallLeftNode);
        gameNode.appendChild(wallNode);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.rotateY(180);
        SnakeEating.viewport = new f.Viewport();
        SnakeEating.viewport.initialize("Viewport", gameNode, cmpCamera, canvas);
        f.Debug.log(SnakeEating.viewport);
        document.addEventListener("keydown", hndKeypress);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
    }
    function update(_event) {
        SnakeEating.viewport.draw();
        let snakeTransform = snake.move();
        let testTransformX = testNode.cmpTransform.local.translation.x;
        let testTransformY = testNode.cmpTransform.local.translation.y;
        let distanceX = testTransformX - snakeTransform.translation.x;
        let distanceY = testTransformY - snakeTransform.translation.y;
        if (distanceX == 0 && distanceY == 0) {
            gameNode.removeChild(testNode);
        }
        if (snakeTransform.translation.y > wallTopNode.cmpTransform.local.translation.y - 1) {
            console.log("HIT WALL TOP");
        }
        if (snakeTransform.translation.y < wallBottomNode.cmpTransform.local.translation.y + 1) {
            console.log("HIT WALL BOTTOM");
        }
        if (snakeTransform.translation.x > wallRightNode.cmpTransform.local.translation.x - 1) {
            console.log("HIT WALL RIGHT");
        }
        if (snakeTransform.translation.x < wallLeftNode.cmpTransform.local.translation.x + 1) {
            console.log("HIT WALL LEFT");
        }
    }
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new f.Node(_name);
        node.addComponent(new f.ComponentTransform);
        node.addComponent(new f.ComponentMaterial(_material));
        node.addComponent(new f.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(f.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    }
    function hndKeypress(_event) {
        switch (_event.code) {
            case f.KEYBOARD_CODE.W:
                snake.direction = f.Vector3.Y();
                break;
            case f.KEYBOARD_CODE.D:
                snake.direction = f.Vector3.X();
                break;
            case f.KEYBOARD_CODE.A:
                snake.direction = f.Vector3.X(-1);
                break;
            case f.KEYBOARD_CODE.S:
                snake.direction = f.Vector3.Y(-1);
        }
    }
})(SnakeEating || (SnakeEating = {}));
//# sourceMappingURL=Main.js.map