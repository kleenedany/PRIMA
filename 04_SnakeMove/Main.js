"use strict";
var SnakeMove;
(function (SnakeMove) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let snake;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        snake = new SnakeMove.Snake;
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
        cmpCamera.pivot.rotateY(180);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(viewport);
        viewport.draw();
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 10);
    }
    function update(_event) {
        snake.move();
        viewport.draw();
    }
})(SnakeMove || (SnakeMove = {}));
//# sourceMappingURL=Main.js.map