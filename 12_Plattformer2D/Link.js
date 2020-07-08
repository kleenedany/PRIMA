"use strict";
var Plattformer2D;
(function (Plattformer2D) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = Plattformer2D.ACTION || (Plattformer2D.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = Plattformer2D.DIRECTION || (Plattformer2D.DIRECTION = {}));
    class Link extends fAid.NodeSprite {
        constructor(_name = "Link") {
            super(_name);
            this.speed = f.Vector3.ZERO();
            this.update = (_event) => {
                let timeFrame = f.Loop.timeFrameGame / 1000;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
            };
            this.addComponent(new f.ComponentTransform());
            this.show(ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Link.animations = {};
            let sprite = new fAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(0, 725, 96, 109), 10, f.Vector2.ZERO(), 98, f.ORIGIN2D.BOTTOMCENTER);
            Link.animations[ACTION.WALK] = sprite;
            sprite = new fAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(0, 0, 96, 109), 3, f.Vector2.ZERO(), 98, f.ORIGIN2D.BOTTOMCENTER);
            Link.animations[ACTION.IDLE] = sprite;
            sprite.frames[2].timeScale = 10;
        }
        show(_action) {
            if (_action == ACTION.JUMP)
                return;
            this.setAnimation(Link.animations[_action]);
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Link.speedMax.x;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.JUMP:
                    this.speed.y = 2;
                    break;
            }
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
        }
    }
    Link.speedMax = new f.Vector2(1.5, 5);
    Plattformer2D.Link = Link;
})(Plattformer2D || (Plattformer2D = {}));
//# sourceMappingURL=Link.js.map