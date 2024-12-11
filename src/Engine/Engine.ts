import * as THREE from 'three'
import { Renderer } from './Renderer';
import { Experience } from './interface/Experience';


export class Engine {
    public readonly scene !: THREE.Scene;
    public readonly renderer !: Renderer;
    
    public readonly canvas !: HTMLCanvasElement;
    public readonly experience !: Experience;

    constructor(canvas : HTMLCanvasElement, experience : Experience) {
        if (!canvas) {
            throw new Error("No canvas provided !");
        }

        this.experience = experience;
        this.scene = new THREE.Scene();
        this.canvas = canvas;

        this.renderer = new Renderer(this);
    }

    update(deltaTime : number){
        this.renderer.update();
        this.experience.update(deltaTime);
    }

}