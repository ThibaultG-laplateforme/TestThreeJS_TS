import * as THREE from 'three'
import { Camera } from '../Engine/Camera';
import { Experience } from '../Engine/interface/Experience';


export class Game implements Experience {
    public readonly scene !: THREE.Scene;
    public readonly renderer !: THREE.WebGLRenderer;
    public readonly camera !: Camera;
    public readonly canvas !: HTMLCanvasElement;

    public torus !:  THREE.Mesh;

    constructor(canvas : HTMLCanvasElement){
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({antialias : false, canvas : canvas})
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera = new Camera(this);
        this.canvas = canvas;

        this.init();

        window.requestAnimationFrame(() => this.update())
    }

    init(){
        this.initObject();
        this.initLight();
        this.initDebug();
    }

    private initObject() {
        // --- Créer un Donut -----------------
        const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); //Objet
        // Un MeshBasicMaterial est unlit
        // Un MeshStandardMaterial est lit
        const material = new THREE.MeshStandardMaterial( { color: 0xffffff } ); //Shader
        this.torus = new THREE.Mesh( geometry, material ); //composition de l'objet+shader
        // ---------------------
        this.scene.add( this.torus ); //Ajout dans la scène en position  0, 0, 0
    }

    private initLight(){
        const pointLight = new THREE.PointLight(0xff0000, 100, 200); // couleur, intensite, taille
        pointLight.position.set(10, 10, 10);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(pointLight, ambientLight);
    }

    private initDebug() {
        const gridHelper = new THREE.GridHelper(200, 50);
        this.scene.add(gridHelper)
    }

    update() {
    const step = () => {
        requestAnimationFrame(step)
        //const elapsedTime = this.clock.getElapsedTime()
        //this.deltaTime = elapsedTime - this.currentTime
        //this.currentTime = elapsedTime
        //this.engine.update(this.deltaTime)

        this.camera.update(0);
    
        this.torus.rotation.x += 0.01;
    
        this.renderer.render(this.scene, this.camera.instance);
    }
    step()
    }


}