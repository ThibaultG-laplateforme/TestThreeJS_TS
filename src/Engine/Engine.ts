import * as THREE from 'three'
import * as CANNON from 'cannon-es'

import CannonDebugger from 'cannon-es-debugger'

import { Renderer } from './Renderer';
import { TExperience, IExperience } from './interface/Experience';
import { Resources } from './Resource';

import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

export class Engine {
    public readonly scene !: THREE.Scene;
    public readonly physicsScene !: CANNON.World; 
    public readonly renderer !: Renderer;
    
    public readonly canvas !: HTMLCanvasElement;
    public readonly experience !: IExperience;
    public readonly resources !: Resources;

    public readonly timer !: THREE.Clock;

    private isLoaded : boolean = false;

    public cannonDebugger !: any

    constructor(canvas : HTMLCanvasElement, experience : TExperience) {
        if (!canvas) {
            throw new Error("No canvas provided !");
        }
        this.timer = new THREE.Clock(true);
        this.canvas = canvas;
        
        this.scene = new THREE.Scene();
        this.physicsScene = new CANNON.World({ gravity : new CANNON.Vec3(0, -9.81, 0) });
        this.renderer = new Renderer(this);

        this.experience = new experience(this);
        this.resources = new Resources(this.experience.resources);

        this.cannonDebugger =  CannonDebugger(this.scene, this.physicsScene, {
            color : 0xff0000,
        })

        this.resources.On('loaded', () => {
            console.info("Resource is loaded sucessfully");
            this.Init();
            this.isLoaded = true;
        })
        
        this.resources.On('progress', (progress: number, url: string) => {
            console.info(`Loading resources : ${progress} => ${url}`);
        })

        this.renderer.renderer.setAnimationLoop( () => this.Update() );
    }

    private Init() {
        this.experience.Init();
        window.addEventListener('resize', () => {this.Resize()}, false);
    }


    private Update() {
        if (!this.isLoaded) {
            return;
        }
        
        let deltaTime = this.timer.getDelta();

        //console.log("FPS : " + 1 / deltaTime);
        
    
        this.renderer.Update();
        this.physicsScene.fixedStep(deltaTime); //TODO: le passer en asyncrone ?
        this.cannonDebugger.update();
        this.experience.Update(deltaTime);
    }

    Resize() {
        this.experience.camera.Resize();
        this.renderer.Resize();
    }

    //TODO : Lancer le update que quand les ressources sont charger

}