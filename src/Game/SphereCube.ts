import * as THREE from 'three'
import { IGameObject } from '../Engine/interface/GameObject';

export class SphereCube implements IGameObject {

    private material !: THREE.Material;
    private geometry !: THREE.BufferGeometry;
    public mesh !: THREE.Mesh;

    constructor(){
        this.init();
    }

    init() {

        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshStandardMaterial({color : "white"})
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        
        let mesh = new THREE.InstancedMesh( geometry, material, 10 );
        
    }

    update(deltatime: number): void {
        
    }
    
}