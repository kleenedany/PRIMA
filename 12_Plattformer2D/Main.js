"use strict";
var Plattformer2D;
(function (Plattformer2D) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    window.addEventListener("load", hdnLoad);
    let game;
    let link;
    function hdnLoad() {
        let canvas = document.querySelector("canvas");
        let img = document.querySelector("img");
        let spritesheet = fAid.createSpriteSheet("Link", img);
        Plattformer2D.Link.generateSprites(spritesheet);
        game = new f.Node("Game");
        link = new Plattformer2D.Link("Link");
        game.appendChild(link);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("aliceblue");
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192keydown" /* DOWN */, handleKeyboard);
        viewport.activateKeyboardEvent("\u0192keydown" /* DOWN */, true);
        viewport.setFocus(true);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
        function update(_event) {
            processInput();
            viewport.draw();
        }
    }
    function handleKeyboard(_event) {
        if (_event.code == f.KEYBOARD_CODE.SPACE)
            link.act(Plattformer2D.ACTION.JUMP);
    }
    function processInput() {
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT]))
            link.act(Plattformer2D.ACTION.WALK, Plattformer2D.DIRECTION.LEFT);
        else if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]))
            link.act(Plattformer2D.ACTION.WALK, Plattformer2D.DIRECTION.RIGHT);
        else
            link.act(Plattformer2D.ACTION.IDLE);
    }
})(Plattformer2D || (Plattformer2D = {}));
//# sourceMappingURL=Main.js.map