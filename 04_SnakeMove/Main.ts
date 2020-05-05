namespace SnakeMove {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    let viewport: f.Viewport;
    let snake: Snake;
   

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        snake = new Snake;
    
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 10);
    }  

   function update(_event: Event): void {
        snake.move();
        viewport.draw();
    }
}