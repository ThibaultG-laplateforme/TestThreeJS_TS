import { WebGLRenderer } from 'three';
import { IGameEntity } from './interface/GameEntity';
import { Engine } from './Engine';

export class Renderer implements IGameEntity{
    public readonly renderer: WebGLRenderer

    constructor(private engine: Engine){
        this.renderer = new WebGLRenderer({
            canvas: this.engine.canvas,
            antialias: false,
        })

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
  
    }

    update() {
        this.renderer.render(
            this.engine.scene, 
            this.engine.experience.camera.instance
        );

        if (this.engine.DebugLogMode >= 3) {
            console.log("Render Engine was update !");
        }
        
    }

    resize(): void {
        
    }
}