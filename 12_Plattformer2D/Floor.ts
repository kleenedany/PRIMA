namespace Plattformer2D {
    import f = FudgeCore;

    export class Floor extends f.Node {
        constructor () {
            super("Floor");

            let mtrSolidGreen: f.Material = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("green")));
            
        }
    }
}