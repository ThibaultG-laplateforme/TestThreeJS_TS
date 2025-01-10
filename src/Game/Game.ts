import * as THREE from 'three'
import { Camera } from '../Engine/Camera/Camera';
import { IExperience } from '../Engine/interface/Experience';
import { Engine } from '../Engine/Engine';
import { EnviroDemo } from './EnviroDemo';
import { SphereCube } from './Object/SphereCube';
import { TResource } from '../Engine/interface/Resource';
import sources from './soures'
import { Fox } from './Object/Fox';
import GameObject from '../Engine/GameUtils/GameObject';
import GameObjectManager from '../Engine/GameUtils/GameObjectManager';
import MeshRenderer from '../Engine/GameUtils/MeshRenderer';
import Torus from './Object/Torus';

export class Game implements IExperience {
    public readonly engine !: Engine;
    public  camera !: Camera;

    private _gameObjectManager : GameObjectManager; 
    
    public readonly resources : TResource[] = sources;

    public torus !:  THREE.Mesh;
    public sphereTest !: SphereCube;

    public squareTest !: GameObject;

    constructor(engine : Engine){
        this.engine = engine;

        this._gameObjectManager = new GameObjectManager();
    }
 
    Init(){
        this.InitCamera();


        let enviro = new EnviroDemo(this.engine);
        this.InitDebug();

        this.sphereTest = new SphereCube();
        this._gameObjectManager.Add(this.sphereTest,"sphere");
        this.sphereTest.Start();
        let r = this.sphereTest.GetComponent(MeshRenderer)?.GetRenderer();
        if (r) {
            this.engine.scene.add(r);
        }
        


        let fox = new Fox(this.engine.resources.itemLoad.foxModel)
        this._gameObjectManager.Add(fox,"fox");
        fox.Start();
        this.engine.scene.add(fox.GetModel());


        const torus = new Torus();
        this._gameObjectManager.Add(torus, "torus");
        r = torus.GetComponent(MeshRenderer)?.GetRenderer();
        if (r) {
            this.engine.scene.add(r);
        }
        torus.transform.SetPosition(new THREE.Vector3(0, 0, 50));



        //console.log(this.fox.constructor.name) // print "fox"

        //this.fox.SetPosition(new THREE.Vector3(-50, 0, 0));
        enviro.dirtGround.SetPosition(new THREE.Vector3(-50, 0, 0));

        //let objgroup = new THREE.Group();
        //objgroup.add(this.fox.GetModel(), this.camera.instance);

        //objgroup.position.y = 10;
        //this.engine.scene.add(objgroup);


        //this.camera.instance.position.copy(this.fox.GetModel().position);
        //let newPosition = this.fox.GetModel().position;
        //newPosition.y += 10;
        //this.camera.instance.lookAt(newPosition);
        
        // this.squareTest = new GameObject();
        // let meshComp = new MeshRenderer();
        // console.log(this.engine.resources.itemLoad.foxModel);
        
        // meshComp.SetRenderer(this.engine.resources.itemLoad.foxModel.scene);


        // this.squareTest.AddComponent(meshComp)
        // this.squareTest.transform.SetPosition(new THREE.Vector3(100,1,5));
        // console.log(this.squareTest.transform.position);

        // this.engine.scene.add(meshComp.GetRenderer());



        
        //this.fox.animation.play("running");
    }
    
    private InitCamera() {
        this.camera = new Camera(this, true);
        
        this.engine.scene.add(this.camera.instance);

        this.camera.SetPosition(10, 5, 30);
    }

    private InitDebug() {
        const gridHelper = new THREE.GridHelper(200, 50);
        this.engine.scene.add(gridHelper)
    }

    Update(deltaTime : number) {
        this.camera.Update(deltaTime);
        
        this._gameObjectManager.Update(deltaTime);
        
        if (this.engine.DebugLogMode >= 3) {
            console.log("Experience Game was update !");
        }
    }


}