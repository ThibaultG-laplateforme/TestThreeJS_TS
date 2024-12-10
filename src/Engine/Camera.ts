import * as THREE from 'three'
import { GameEntity } from './interface/GameEntity'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Game } from '../Game/Game'


export class Camera implements GameEntity {
    public instance!: THREE.PerspectiveCamera
    private controls!: OrbitControls

    constructor(private game : Game){
        this.initCamera();
        this.initControls();

        document.body.onscroll = () => this.moveCamera();
    }

    private initCamera(){
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        )

        //this.instance.position.z = 40;
        this.instance.position.y = 3;

        this.game.scene.add(this.instance);
    }

    private initControls(){
        //this.controls = new OrbitControls(this.instance, this.game.canvas);
    }

    moveCamera() {
        const t = document.body.getBoundingClientRect().top; // Recupere la distance du client par rapport au haut de la page

        this.game.torus.rotation.y = t * 0.0005;

        this.game.moon.rotation.y += 0.01;
      
        this.instance.position.z = t * -0.01;
    }

    public update(deltatime: number) {
        //this.controls.update();
    }

    public resize() {
        
    }
}