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


    constructor(engine : Engine){
        this.engine = engine;

        this._gameObjectManager = new GameObjectManager();
    }
 
    Init(){
        this.InitCamera();


        let enviro = new EnviroDemo(this.engine);
        this.InitDebug();

        const sphereTest = new SphereCube();
        this._gameObjectManager.Add(sphereTest,"sphere");
        sphereTest.Start();
        let r = sphereTest.GetComponent(MeshRenderer)?.GetRenderer();
        if (r) {
            this.engine.scene.add(r);
        }
        
        // TODO: Revoir hierarchie + fonctionnement de création des GO
        // TODO: Voir comment faire des singletons
        // TODO: Automatiser l'ajout au GOManager
        // TODO: Automatiser l'ajout des mesh a la scene 
        // TODO: Gerer la déactivation des componants/GO


        const fox = new Fox(this.engine.resources.itemLoad.foxModel)
        this._gameObjectManager.Add(fox,"fox");
        fox.Start();
        this.engine.scene.add(fox.GetModel());


        const torus = new Torus();
        this._gameObjectManager.Add(torus, "torus");
        r = torus.GetComponent(MeshRenderer)?.GetRenderer();
        if (r) {
            this.engine.scene.add(r);
        }
        torus.transform.SetPosition(-100, 0, 0);



        enviro.dirtGround.SetPosition(new THREE.Vector3(-50, 0, 0));
        
        //this.fox.animation.play("running");
    }
    
    private InitCamera() {
        this.camera = new Camera(this, true);
        
        this.engine.scene.add(this.camera.instance);

        this.camera.SetPosition(20, 5, 0);
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