import * as THREE from 'three'
import { Renderer } from './Renderer';
import { TExperience, IExperience } from './interface/Experience';
import { Resources } from './Resource';


export class Engine {
    public readonly scene !: THREE.Scene;
    public readonly renderer !: Renderer;
    
    public readonly canvas !: HTMLCanvasElement;
    public readonly experience !: IExperience;
    public readonly resources !: Resources;

    public readonly timer !: THREE.Clock;

    public readonly DebugLogMode = 1; // 0=null, 1=essential, 2=essential+, 3=All

    private isLoaded : boolean = false;

    constructor(canvas : HTMLCanvasElement, experience : TExperience) {
        if (!canvas) {
            throw new Error("No canvas provided !");
        }
        this.timer = new THREE.Clock(true);
        this.canvas = canvas;
        
        this.scene = new THREE.Scene();
        this.renderer = new Renderer(this);

        this.experience = new experience(this);
        this.resources = new Resources(this.experience.resources);


        this.resources.On('loaded', () => {
            console.info("Resource is loaded sucessfully");
            this.Init();
            this.isLoaded = true;
        })
        
        this.resources.On('progress', (progress: number, url: string) => {
            console.info(`Loading resources : ${progress} => ${url}`);
        })



        if (this.DebugLogMode >= 1) {
            console.log(this)
        }

        this.renderer.renderer.setAnimationLoop( () => this.Update() );
    }

    private Init() {
        this.experience.Init();
    }


    private Update() {
        if (!this.isLoaded) {
            return;
        }
        
        let deltaTime = this.timer.getDelta();
    
        this.renderer.Update();
        this.experience.Update(deltaTime);
    }

    //TODO : Inscrire les event de chargement de ressources
    //TODO : Lancer le update que quand les ressources sont charger

}