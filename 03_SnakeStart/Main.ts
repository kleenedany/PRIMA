namespace SnakeStart {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    let viewport: f.Viewport;
    let snake: f.Node;
    let snakeSpeed: number = 0.04;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let mesh: f.MeshQuad = new f.MeshQuad();
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        
        snake = new f.Node("Snake");
        let cmpTransformSnake: f.ComponentTransform= new f.ComponentTransform();
        snake.addComponent(cmpTransformSnake);

        for(let i: number = 0; i < 4; i++){
            let node: f.Node = new f.Node("Quad");

            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            node.addComponent(cmpMesh);
            cmpMesh.pivot.scale(new f.Vector3(0.9, 0.9, 0.9));
           
            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
            node.addComponent(cmpMaterial);
    
            let cmpTransform: f.ComponentTransform = new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-1 * i, 0, 0)));
            node.addComponent(cmpTransform);

            snake.appendChild(node);
        }
      

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 20);
    }  

    function update(_event: Event): void {
        snake.mtxLocal.translate(new f.Vector3(snakeSpeed, 0, 0));

        if(snake.mtxLocal.translation.x > 15 || snake.mtxLocal.translation.x < -12){
            snakeSpeed *= -1;
        }

        viewport.draw();
    }
}