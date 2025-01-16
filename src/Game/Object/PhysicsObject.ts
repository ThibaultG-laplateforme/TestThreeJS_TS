import * as THREE from "three"
import * as CANNON from "cannon-es"
import GameObject from "../../Engine/GameUtils/GameObject";
import MeshRenderer from "../../Engine/GameUtils/MeshRenderer";
import Collider from "../../Engine/GameUtils/Physics/Collision/Collider";
import RigidBody from "../../Engine/GameUtils/Physics/RigidBody";

export default class PhysicsObject extends GameObject {
    constructor() {
        super();
    }

    Start(): void {
            let meshRenderer = new MeshRenderer();
            this.AddComponent(meshRenderer);
        
            const radius = 1;
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshBasicMaterial({color : "blue"})
            
            meshRenderer.CreateMesh(geometry, material);

            const collider = new Collider(new CANNON.Sphere(radius))
            this.AddComponent(collider);
            
            const rigidBody = new RigidBody();
            rigidBody.SetCollider(collider);
            this.AddComponent(rigidBody);
    }
}