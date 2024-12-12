import * as THREE from 'three'
import { Renderer } from './Renderer';
import { TExperience, IExperience } from './interface/Experience';


export class Engine {
    public readonly scene !: THREE.Scene;
    public readonly renderer !: Renderer;
    
    public readonly canvas !: HTMLCanvasElement;
    public readonly experience !: IExperience;

    public readonly timer !: THREE.Clock;

    public readonly DebugLogMode = 1; // 0=null, 1=essential, 2=essential+, 3=All


    constructor(canvas : HTMLCanvasElement, experience : TExperience) {
        if (!canvas) {
            throw new Error("No canvas provided !");
        }
        //this.timer = new THREE.Clock(true);
        this.canvas = canvas;
        
        this.scene = new THREE.Scene();
        this.renderer = new Renderer(this);

        this.experience = new experience(this);

        if (this.DebugLogMode >= 1) {
            console.log(this)
        }

        this.init();


        this.renderer.renderer.setAnimationLoop( () => this.update() );
    }

    private init() {
        this.experience.init();
    }


    private update() {
        //let deltaTime = this.timer.getDelta();
    
        this.renderer.update();
        this.experience.update(0);
    }

}