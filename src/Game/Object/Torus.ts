import * as THREE from 'three'
import GameObject from "../../Engine/GameUtils/GameObject";
import MeshRenderer from "../../Engine/GameUtils/MeshRenderer";

export default class Torus extends GameObject {
    constructor(){
        super();
    }

    Init(): void {
        const meshRenderer = new MeshRenderer()
        this.AddComponent(meshRenderer)

        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial( { color: "white" } ); //Shader
        meshRenderer.CreateMesh(geometry, material);
    }

    Update(deltatime: number): void {
        super.Update(deltatime);

        this.transform.AddRotation(-10 * deltatime,0,0)
    }


}