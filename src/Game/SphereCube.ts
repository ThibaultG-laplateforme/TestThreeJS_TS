import * as THREE from 'three'
import { IGameObject } from '../Engine/interface/GameObject';

export class SphereCube implements IGameObject {

    private material !: THREE.Material;
    private geometry !: THREE.BufferGeometry;
    public mesh !: THREE.Mesh;

    private time !: number;

    constructor(){
        this.init();
        this.time = 0;
    }

    init() {

        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshStandardMaterial({color : "blue"})
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        const geometry = new THREE.IcosahedronGeometry( 30, 3 );
        const material = new THREE.MeshPhongMaterial( { color: "red"} );
        
        let mesh = new THREE.InstancedMesh( geometry, material, 10 );

        
    }

    update(deltatime: number): void {
        this.time += deltatime;
        this.mesh.position.x = Math.cos(this.time * 1) * 3;  //cos(temps * frequence) * amplitude
        //if(this.time > 3*2) this.time = 0; // 1 aller retour = amplitude * 2

    }
    
}