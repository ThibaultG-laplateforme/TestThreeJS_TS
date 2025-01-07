import * as THREE from 'three'
import { Camera } from '../Engine/Camera/Camera';
import { IExperience } from '../Engine/interface/Experience';
import { Engine } from '../Engine/Engine';
import { EnviroDemo } from './EnviroDemo';
import { SphereCube } from './SphereCube';
import { TResource } from '../Engine/interface/Resource';
import sources from './soures'
import { Fox } from './Fox';
import { TComponent } from '../Engine/interface/Component';
import Transform from '../Engine/GameUtils/Transform';
import { GameObject } from '../Engine/GameUtils/GameObject';
import MeshRenderer from '../Engine/GameUtils/MeshRenderer';

export class Game implements IExperience {
    public readonly engine !: Engine;
    public  camera !: Camera;
    
    public readonly resources : TResource[] = sources;

    public torus !:  THREE.Mesh;
    public sphereTest !: SphereCube;
    public fox !: Fox;

    constructor(engine : Engine){
        this.engine = engine;
    }
 
    Init(){
        this.InitCamera();


        let enviro = new EnviroDemo(this.engine);
        this.InitObject();
        this.InitDebug();

        this.sphereTest = new SphereCube();
        this.sphereTest.mesh.position.x = -100;
        this.engine.scene.add(this.sphereTest.mesh);
        
        this.fox = new Fox(this.engine.resources.itemLoad.foxModel)
        this.engine.scene.add(this.fox.GetModel());

        //console.log(this.fox.constructor.name) // print "fox"

        this.fox.SetPosition(new THREE.Vector3(-50, 0, 0));
        enviro.dirtGround.SetPosition(new THREE.Vector3(-50, 0, 0));

        let objgroup = new THREE.Group();
        objgroup.add(this.fox.GetModel(), this.camera.instance);

        objgroup.position.y = 10;
        this.engine.scene.add(objgroup);


        this.camera.instance.position.copy(this.fox.GetModel().position);
        let newPosition = this.fox.GetModel().position;
        newPosition.y += 10;
        this.camera.instance.lookAt(newPosition);
        
        let test = new GameObject();
        test.AddComponent(new MeshRenderer())
        test.transform.SetPosition(new THREE.Vector3(456,1,5));
        console.log(test.transform.position)
        
        //this.fox.animation.play("running");
    }
    
    private InitCamera() {
        this.camera = new Camera(this, true);
        
        this.engine.scene.add(this.camera.instance);


        //this.camera.SetPosition(10, 5, 30);
    }

    private InitObject() {
        // --- Créer un Donut -----------------
        const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); //Objet
        // Un MeshBasicMaterial est unlit
        // Un MeshStandardMaterial est lit
        const material = new THREE.MeshStandardMaterial( { color: "white" } ); //Shader
        this.torus = new THREE.Mesh( geometry, material ); //composition de l'objet+shader
        this.torus.position.x = -100;
        // ---------------------
        this.engine.scene.add( this.torus ); //Ajout dans la scène en position  0, 0, 0
    }



    private InitDebug() {
        const gridHelper = new THREE.GridHelper(200, 50);
        this.engine.scene.add(gridHelper)
    }

    Update(deltaTime : number) {

        
        this.camera.Update(deltaTime);
        
        this.torus.rotation.x += 0.01;

        this.sphereTest.Update(deltaTime);
        this.fox.Update(deltaTime);

        
        if (this.engine.DebugLogMode >= 3) {
            console.log("Experience Game was update !");
        }
    }


}