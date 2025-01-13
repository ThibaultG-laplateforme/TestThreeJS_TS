import * as THREE from "three"
import GameObject from "../../Engine/GameUtils/GameObject";
import MeshRenderer from "../../Engine/GameUtils/MeshRenderer";

export default class PhysicsObject extends GameObject {
    constructor() {
        super();
    }

    Start(): void {
            let meshRenderer = new MeshRenderer();
            this.AddComponent(meshRenderer);
    
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshBasicMaterial({color : "blue"})
            
            meshRenderer.CreateMesh(geometry, material);
    }
}