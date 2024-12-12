import * as THREE from 'three'
import { Camera } from '../Engine/Camera';
import { IExperience } from '../Engine/interface/Experience';
import { Engine } from '../Engine/Engine';
import { Color } from '../Utils/Color';
import { EnviroDemo } from './EnviroDemo';


export class Game implements IExperience {
    public readonly engine !: Engine;


    public readonly camera !: Camera;

    public torus !:  THREE.Mesh;

    constructor(engine : Engine){
        this.engine = engine;

        this.camera = new Camera(this, true);

        this.engine.scene.add(this.camera.instance);
    }

    init(){
        let enviro = new EnviroDemo(this.engine.scene);
        this.initObject();
        this.initDebug();

        this.camera.SetPosition(10, 5, 30, true);
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