namespace SnakeCollision {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;
    let snake: Snake;
    let testNode: f.Node;
    let gameNode: f.Node;
    let wallNode: f.Node;
    let wallTopNode: f.Node;
    let wallBottomNode: f.Node;
    let wallLeftNode: f.Node;
    let wallRightNode: f.Node;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        gameNode = new f.Node("Root");
        snake = new Snake();
        gameNode.appendChild(snake);

        wallNode = new f.Node("Wall");
    
        testNode = new f.Node("testObject");
        let mtrSolidFireBrick: f.Material = new f.Material("SolidFireBrick", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("FIREBRICK")));
        let cmpMaterialFireBrick: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidFireBrick);
        testNode.addComponent(cmpMaterialFireBrick);
        let meshTest: f.MeshQuad = new f.MeshQuad();
        let cmpTest: f.ComponentMesh = new f.ComponentMesh(meshTest);
        testNode.addComponent(cmpTest);
        let cmpTransformTest: f.ComponentTransform = new f.ComponentTransform();
        testNode.addComponent(cmpTransformTest);
        testNode.mtxLocal.translate(new f.Vector3(-6, 0, 0));
        cmpTest.pivot.scale(new f.Vector3(0.9, 0.9, 0.9));
        gameNode.appendChild(testNode);

        // WALL
        let meshWall: f.MeshQuad = new f.MeshQuad();
        let mtrSolidWhite: f.Material = new  f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));

        wallBottomNode = createNode("wallBottom", meshWall, mtrSolidWhite, new f.Vector2(0, -9.5), new f.Vector2(32, 1));
        wallNode.appendChild(wallBottomNode);

        wallTopNode = createNode("wallTop", meshWall, mtrSolidWhite, new f.Vector2(0, 9.5), new f.Vector2(32, 1));
        wallNode.appendChild(wallTopNode);

        wallRightNode = createNode("wallRight", meshWall, mtrSolidWhite, new f.Vector2(15.5, 0), new f.Vector2(1, 20));
        wallNode.appendChild(wallRightNode);

        wallLeftNode = createNode("wallLeft", meshWall, mtrSolidWhite, new f.Vector2(-15.5, 0), new f.Vector2(1, 20));
        wallNode.appendChild(wallLeftNode);

        gameNode.appendChild(wallNode);

    
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", gameNode, cmpCamera, canvas);
        f.Debug.log(viewport);

        document.addEventListener("keydown", hndKeypress);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
    }  
 
    function update(_event: f.Eventƒ): void {

        viewport.draw();
        let snakeTransform: f.Matrix4x4 = snake.move();
  
        let testTransformX: number = testNode.cmpTransform.local.translation.x;
        let testTransformY: number = testNode.cmpTransform.local.translation.y;

        let distanceX: number = testTransformX - snakeTransform.translation.x;
        let distanceY: number = testTransformY - snakeTransform.translation.y;

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

    function createNode(_name: string, _mesh: f.Mesh, _material: f.Material, _translation: f.Vector2, _scaling: f.Vector2): f.Node {
        let node: f.Node = new f.Node(_name);
        node.addComponent(new f.ComponentTransform);
        node.addComponent(new f.ComponentMaterial(_material));
        node.addComponent(new f.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(f.ComponentMesh).pivot.scale(_scaling.toVector3());

        return node;
    }


    function hndKeypress(_event: f.EventKeyboard): void {
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

}