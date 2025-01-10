import * as THREE from 'three'
import GameObject from '../../Engine/GameUtils/GameObject';
import MeshRenderer from '../../Engine/GameUtils/MeshRenderer';


export class SphereCube extends GameObject {

    private material !: THREE.Material;
    private geometry !: THREE.BufferGeometry;
    public mesh !: THREE.Mesh;

    private time !: number;

    constructor(){
        super();
        this.time = 0;
    }

    Init() {
        super.Init();
        console.log('Init');
    }
    
    
    Start(): void {
        let meshRenderer = new MeshRenderer();
        this.AddComponent(meshRenderer);

        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.material = new THREE.MeshStandardMaterial({color : "blue"})
        
        meshRenderer.CreateMesh(this.geometry, this.material);
    
        /*
        const geometry = new THREE.IcosahedronGeometry( 30, 3 );
        const material = new THREE.MeshPhongMaterial( { color: "red"} );
        
        let mesh = new THREE.InstancedMesh( geometry, material, 10 );
        */
    }

    Update(deltatime: number): void {
        super.Update(deltatime);

        //console.log('UPDATE');
        

        this.time += deltatime;
        this.transform.SetPosition(new THREE.Vector3((Math.cos(this.time * 1) * 3) -100, 0, 0));  //cos(temps * frequence) * amplitude
        //if(this.time > 3*2) this.time = 0; // 1 aller retour = amplitude * 2
 
    }
    
}