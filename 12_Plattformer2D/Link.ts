namespace Plattformer2D {
    import f = FudgeCore;
    import fAid = FudgeAid;

    export enum ACTION {
        IDLE = "Idle",
        WALK = "Walk",
        JUMP = "Jump"
    }

    export enum DIRECTION {
        LEFT, RIGHT
    }

    export class Link extends fAid.NodeSprite {
        private static animations: fAid.SpriteSheetAnimations;
        private static speedMax: f.Vector2 = new f.Vector2(1.5, 5);
        public speed: f.Vector3 = f.Vector3.ZERO();
        private action: ACTION;

        constructor(_name: string = "Link") {
            super(_name);
            this.addComponent(new f.ComponentTransform());
            this.show(ACTION.IDLE);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        }

        public static generateSprites(_spritesheet: f.CoatTextured): void {
            Link.animations = {};
            let sprite: fAid.SpriteSheetAnimation = new fAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(0, 725, 96, 109), 10, f.Vector2.ZERO(), 98, f.ORIGIN2D.BOTTOMCENTER);
            Link.animations[ACTION.WALK] = sprite;

            sprite = new fAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(0, 0, 96, 109), 3, f.Vector2.ZERO(), 98, f.ORIGIN2D.BOTTOMCENTER);
            Link.animations[ACTION.IDLE] = sprite;
            sprite.frames[2].timeScale = 10;
        }

        public show(_action: ACTION): void {
            if (_action == ACTION.JUMP)
                return;
            this.setAnimation(<fAid.SpriteSheetAnimation>Link.animations[_action]);
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
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

        private update = (_event: f.Eventƒ): void => {
            let timeFrame: number = f.Loop.timeFrameGame / 1000;
            let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
        }
    }
}