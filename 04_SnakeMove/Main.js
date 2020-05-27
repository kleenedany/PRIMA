"use strict";
var SnakeMove;
(function (SnakeMove) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        snake = new SnakeMove.Snake();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.rotateY(180);
        SnakeMove.viewport = new f.Viewport();
        SnakeMove.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(SnakeMove.viewport);
        document.addEventListener("keydown", hndKeypress);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
    }
    function update(_event) {
        SnakeMove.viewport.draw();
        snake.move();
    }
    // Klasse Rechteck für Kollisionen; im FUDGE
    // Sphere für Kollisionen
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
})(SnakeMove || (SnakeMove = {}));
//# sourceMappingURL=Main.js.map