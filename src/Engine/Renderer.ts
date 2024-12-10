import { WebGLRenderer } from 'three';
import { GameEntity } from './interface/GameEntity';
import { Engine } from './Engine';

export class Renderer implements GameEntity{
    private readonly renderer: WebGLRenderer

    constructor(private engine: Engine){
        this.renderer = new WebGLRenderer({
            canvas: this.engine.canvas,
            antialias: false,
        })

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
  
    }

    update() {
        //this.renderer.render(this.engine.scene, this.engine.camera);
    }

    resize(): void {
        
    }
}