import * as THREE from 'three'
import { Camera } from '../Engine/Camera';
import { IExperience } from '../Engine/interface/Experience';
import { Engine } from '../Engine/Engine';
import { Color } from '../Utils/Color';


export class Game implements IExperience {
    public readonly engine !: Engine;


    public readonly camera !: Camera;

    public torus !:  THREE.Mesh;

    constructor(engine : Engine){
        this.engine = engine;

        this.camera = new Camera(this);

        this.engine.scene.add(this.camera.instance);
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
        const material = new THREE.MeshStandardMaterial( { color: Color.WHITE } ); //Shader
        this.torus = new THREE.Mesh( geometry, material ); //composition de l'objet+shader
        // ---------------------
        this.engine.scene.add( this.torus ); //Ajout dans la scène en position  0, 0, 0
    }

    private initLight(){
        const pointLight = new THREE.PointLight(0xff0000, 100, 200); // couleur, intensite, taille
        pointLight.position.set(10, 10, 10);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.engine.scene.add(pointLight, ambientLight);
    }

    private initDebug() {
        const gridHelper = new THREE.GridHelper(200, 50);
        this.engine.scene.add(gridHelper)
    }

    update(deltaTime : number) {

        
        this.camera.update(deltaTime);
        
        this.torus.rotation.x += 0.01;
        
        if (this.engine.DebugLogMode >= 3) {
            console.log("Experience Game was update !");
        }
    }


}