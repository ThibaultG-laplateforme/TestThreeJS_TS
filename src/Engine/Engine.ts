import * as THREE from 'three'
import { Renderer } from './Renderer';


export class Engine {
    public readonly scene !: THREE.Scene;
    public readonly renderer !: Renderer;
    
    public readonly canvas !: HTMLCanvasElement;

    constructor(canvas : HTMLCanvasElement) {
        this.scene = new THREE.Scene();
        this.canvas = canvas;

        this.renderer = new Renderer(this);
    }
}