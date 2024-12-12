import * as THREE from 'three'
import { IGameEntity } from './interface/GameEntity'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Game } from '../Game/Game'


export class Camera implements IGameEntity {
    public instance!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;

    constructor(private game : Game, orbitalControls ?: boolean){
        this.initCamera();
        this.initControls(orbitalControls);
    }

    private initCamera(){
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        )
    }
    
    private initControls(orbitalControls ?: boolean) {
        if (orbitalControls) {
            this.instance.position.z = 1;
            this.controls = new OrbitControls(this.instance, this.game.engine.canvas);
        }
    }

    public SetPosition(x : number, y : number = 0, z : number = 0, updateView : boolean = false){
        this.instance.position.set(x, y, z);

        if (updateView) {
            this.instance.lookAt(new THREE.Vector3())
        }
    }

    public update(deltatime: number) {
        
    }

    public resize() {
        
    }
}