import * as THREE from 'three'
import { Resources } from '../../../Engine/Resource';


export class DirtFloor {
    geometry !: THREE.BufferGeometry;
    material !: THREE.Material;
    mesh !: THREE.Mesh;


    constructor(private resources : Resources){
        this.Init();
    }

    Init(){
        this.SetGeometry();
        this.SetMaterial();
        this.SetMesh();
    }

    SetGeometry(){
        this.geometry = new THREE.CircleGeometry(20, 20);
    }

    SetMaterial(){
        let groundTexture = {map : THREE.Texture, normal : THREE.Texture};

        groundTexture.map = this.resources.itemLoad.DirtColorTexture;
        groundTexture.map.colorSpace = THREE.SRGBColorSpace;
        groundTexture.map.repeat.set(1.5, 1.5);
        groundTexture.map.wrapS = THREE.RepeatWrapping;
        groundTexture.map.wrapT = THREE.RepeatWrapping;

        groundTexture.normal = this.resources.itemLoad.DirtNormalTexture;
        groundTexture.normal.colorSpace = THREE.SRGBColorSpace;
        groundTexture.normal.repeat.set(1.5, 1.5);
        groundTexture.normal.wrapS = THREE.RepeatWrapping;
        groundTexture.normal.wrapT = THREE.RepeatWrapping;

        this.material = new THREE.MeshStandardMaterial({
            map : groundTexture.map,
            normalMap : groundTexture.normal
        })


    }

    SetMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5;
        this.mesh.receiveShadow = true;
        //console.log('ready to display')
    }

    GetMesh(){
        return this.mesh;
    }

    SetPosition(newPosition : THREE.Vector3): void {
        this.mesh.position.set(newPosition.x, newPosition.y, newPosition.z);
    }
    
}