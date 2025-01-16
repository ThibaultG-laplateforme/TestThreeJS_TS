import * as THREE from 'three'
import { IGameEntity } from '../interface/GameEntity'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Game } from '../../Game/Game'
import { IGameObject } from '../interface/GameObject';
import { IExperience } from '../interface/Experience';


export class Camera implements IGameEntity {
    public instance!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;

    private _currentPosition : THREE.Vector3 = new THREE.Vector3();
    private _lookPosition : THREE.Vector3 = new THREE.Vector3();

    private _target !: THREE.Mesh;

    constructor(private game : IExperience, orbitalControls ?: boolean){
        this.Init();
        this.InitControls(orbitalControls);
    }

    Init(){
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        )
    }
    
    private InitControls(orbitalControls ?: boolean) {
        if (orbitalControls) {
            this.instance.position.x = 1;
            this.controls = new OrbitControls(this.instance, this.game.engine.canvas);
        }
    }

    public SetPosition(x : number, y : number = 0, z : number = 0 ){
        this.instance.position.set(x, y, z);
    }
    public SetTarget(target : THREE.Mesh) {
        this._target = target;
    }

    private CalculateLookAt(){
        const idealLookAt = new THREE.Vector3(0, 5, 20);
        //idealLookAt.applyQuaternion(this._target)
    }

    public Update(deltatime: number) {
        
    }

    public Resize() {
        this.instance.aspect = window.innerWidth / window.innerHeight;
        this.instance.updateProjectionMatrix();
    }
}