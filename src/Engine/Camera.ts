import * as THREE from 'three'
import { GameEntity } from './interface/GameEntity'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export class Camera implements GameEntity {
    public instance!: THREE.PerspectiveCamera
    private controls!: OrbitControls

    constructor(private scene : THREE.Scene){
        this.initCamera();
    }

    private initCamera(){
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        )

        this.instance.position.z = 30;

        this.scene.add(this.instance);
    }

    public update(deltatime: number) {
        
    }

    public resize() {
        
    }
}