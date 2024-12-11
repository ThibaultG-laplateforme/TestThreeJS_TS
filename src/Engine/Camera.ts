import * as THREE from 'three'
import { GameEntity } from './interface/GameEntity'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Game } from '../Game/Game'


export class Camera implements GameEntity {
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

        this.game.scene.add(this.instance);
    }

    private initControls() {
        this.controls = new OrbitControls(this.instance, this.game.renderer.domElement);
    }

    public update(deltatime: number) {
        
    }

    public resize() {
        
    }
}