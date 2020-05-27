namespace SnakeMove {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;
    let snake: Snake;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        f.RenderManager.initialize();
        f.Debug.log(canvas);

        snake = new Snake();
    
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(viewport);

        document.addEventListener("keydown", hndKeypress);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
    }  

    function update(_event: f.Eventƒ): void {

        viewport.draw();
        snake.move();
        
    }

    // Klasse Rechteck für Kollisionen; im FUDGE
    // Sphere für Kollisionen

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