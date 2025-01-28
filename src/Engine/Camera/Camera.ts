import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { IExperience } from '../interface/Experience';
import GameObject from '../GameUtils/GameObject';


export class Camera extends GameObject {
    public instance!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;

    private _currentPosition: THREE.Vector3 = new THREE.Vector3();
    private _lookPosition: THREE.Vector3 = new THREE.Vector3();

    constructor(private game: IExperience, orbitalControls?: boolean) {
        super();
        this.Init();
        this.InitControls(orbitalControls);
        this.InitEvent();
    }

    InitEvent() {
        this.On("update.position", (newPosition: THREE.Vector3) => { this.UpdatePosition(newPosition); })
    }

    
    Init() {
        this.instance = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
    }
    
    private InitControls(orbitalControls?: boolean) {
        if (orbitalControls) {
            this.instance.position.x = 1;
            this.controls = new OrbitControls(this.instance, this.game.engine.canvas);
        }
    }
    
    
    UpdatePosition(pos: THREE.Vector3) {
        this.instance.position.copy(pos);
        //console.log(pos);
    }

    public Update(deltatime: number) {

    }

    public Resize() {
        this.instance.aspect = window.innerWidth / window.innerHeight;
        this.instance.updateProjectionMatrix();


    }
}