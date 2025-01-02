import * as THREE from 'three'
import { Camera } from '../Engine/Camera';
import { IExperience } from '../Engine/interface/Experience';
import { Engine } from '../Engine/Engine';
import { EnviroDemo } from './EnviroDemo';
import { SphereCube } from './SphereCube';
import { TResource } from '../Engine/interface/Resource';
import sources from './soures'
import { Fox } from './Fox';

export class Game implements IExperience {
    public readonly engine !: Engine;
    public readonly camera !: Camera;
    
    public readonly resources : TResource[] = sources;

    public torus !:  THREE.Mesh;
    public sphereTest !: SphereCube;
    public fox !: Fox;

    constructor(engine : Engine){
        this.engine = engine;

        this.camera = new Camera(this, true);

        this.engine.scene.add(this.camera.instance);

    
    }
 
    init(){
        let enviro = new EnviroDemo(this.engine.scene);
        this.initObject();
        this.initDebug();

        this.sphereTest = new SphereCube();
        this.engine.scene.add(this.sphereTest.mesh);
        
        this.fox = new Fox(this.engine.resources.itemLoad.foxModel)
        this.engine.scene.add(this.fox.getModel());

        //this.fox.animation.play("running");
       
        this.camera.SetPosition(10, 5, 30, true);
    }

    private initObject() {
        // --- Créer un Donut -----------------
        const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); //Objet
        // Un MeshBasicMaterial est unlit
        // Un MeshStandardMaterial est lit
        const material = new THREE.MeshStandardMaterial( { color: "white" } ); //Shader
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

        this.sphereTest.update(deltaTime);
        this.fox.update(deltaTime);

        
        if (this.engine.DebugLogMode >= 3) {
            console.log("Experience Game was update !");
        }
    }


}