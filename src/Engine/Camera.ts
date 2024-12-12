import * as THREE from 'three'
import { IGameEntity } from './interface/GameEntity'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Game } from '../Game/Game'


export class Camera implements IGameEntity {
    public instance!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;

    constructor(private game : Game){
        this.initCamera();
        this.initControls();
    }

    private initCamera(){
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        )

        this.instance.position.z = 30;

    }

    private initControls() {
        this.controls = new OrbitControls(this.instance, this.game.engine.canvas);
    }

    public update(deltatime: number) {
        
    }

    public resize() {
        
    }
}