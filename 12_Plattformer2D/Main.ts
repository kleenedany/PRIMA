namespace Plattformer2D {
    import f = FudgeCore;
    import fAid = FudgeAid;

    window.addEventListener("load", hdnLoad);
   
    let game: f.Node;
    let link: Link;

    function hdnLoad(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        let img: HTMLImageElement = document.querySelector("img");
        let spritesheet: f.CoatTextured = fAid.createSpriteSheet("Link", img);
        Link.generateSprites(spritesheet);

        game = new f.Node("Game");
        link = new Link("Link");
       
        game.appendChild(link);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

        let viewport: f.Viewport = new f.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();

        viewport.addEventListener(f.EVENT_KEYBOARD.DOWN, handleKeyboard);
        viewport.activateKeyboardEvent(f.EVENT_KEYBOARD.DOWN, true);
        viewport.setFocus(true);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);

        function update(_event: f.Eventƒ): void {
            processInput();

            viewport.draw();
        }
    }

    function handleKeyboard(_event: f.EventKeyboard): void {
        if (_event.code == f.KEYBOARD_CODE.SPACE)
            link.act(ACTION.JUMP);
    }

    function processInput(): void {
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT]))
            link.act(ACTION.WALK, DIRECTION.LEFT);
        else if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]))
            link.act(ACTION.WALK, DIRECTION.RIGHT);
        else
            link.act(ACTION.IDLE);
    }
    
}