import * as THREE from 'three'
import { Camera } from '../Engine/Camera/Camera';
import { IExperience } from '../Engine/interface/Experience';
import { Engine } from '../Engine/Engine';
import { TResource } from '../Engine/interface/Resource';
import sources from './soures'
import GameObjectManager from '../Engine/GameUtils/GameObjectManager';
import PhysicsObject from './Object/PhysicsObject';
import MeshRenderer from '../Engine/GameUtils/MeshRenderer';
import GameObject from '../Engine/GameUtils/GameObject';


export class CustomPhysicsScene implements IExperience {
    public readonly engine !: Engine;
    public  camera !: Camera;

    private _gameObjectManager : GameObjectManager; 
    
    public readonly resources : TResource[] = sources;


    constructor(engine : Engine){
        this.engine = engine;

        this._gameObjectManager = new GameObjectManager();
    }
 
    Init(){
        this.InitCamera();
        this.InitDebug();

        let sphere = new PhysicsObject();
        sphere.Start();
        this._gameObjectManager.Add(sphere, "sphere");
        let r = sphere.GetComponent(MeshRenderer)?.GetRenderer();
        if (r) {
            this.engine.scene.add(r);
        }


        let plane = new GameObject();
        this._gameObjectManager.Add(plane, "floor");

        let geometry = new THREE.PlaneGeometry(10, 10);
        let material = new THREE.MeshBasicMaterial({color: "red"});

        plane.AddComponent(new MeshRenderer());
        plane.GetComponent(MeshRenderer)?.CreateMesh(geometry, material)
        this.engine.scene.add(plane.GetComponent(MeshRenderer)?.GetRenderer());

        //plane.transform.SetPosition(new THREE.Vector3())l
        //plane.GetComponent(MeshRenderer)?.GetRenderer().rotateX(-90 * Math.PI/180);
        plane.transform.AddRotation(-90, 0, 0);









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