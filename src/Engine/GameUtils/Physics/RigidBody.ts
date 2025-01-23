import * as CANNON from 'cannon-es'
import { Quaternion, Vector3 } from 'three';

import Component from '../Component';
import Collider from './Collision/Collider';

export default class RigidBody extends Component {
    public  collider !: Collider
    public  body !: CANNON.Body

    constructor(){
        super();
        
    }

    SetCollider(collider : Collider) {
        this.collider = collider;
    
        this.body = new CANNON.Body({
            mass: 1,
            shape : collider.meshCollider
        })
    }
    
    Init(): void {
        this.InitEvent();
    }
        
    private InitEvent(): void{        
        this.GetParent()?.On('update.position', (newPosition : Vector3) => { this.UpdatePosition(newPosition); })
        this.GetParent()?.On('update.rotation', (newQuaternion : Quaternion) => { this.UpdateQuaternion(newQuaternion); })
    }

    private AddInPhysicsScene() {

    }

    private RemoveInPhysicsScene() {

    }

    private UpdatePosition(newPos : Vector3){
        this.body.position.copy(new CANNON.Vec3(newPos.x, newPos.y, newPos.z))
    }

    private UpdateQuaternion(newQua : Quaternion){
        this.body.quaternion.copy(new CANNON.Quaternion(newQua.x, newQua.y, newQua.z, newQua.w));
    }

    Update(deltatime: number): void {
        this.GetParent()?.Emit('update.position', this.body.position);
        this.GetParent()?.Emit('update.rotation', this.body.quaternion);
    }

    Impulse(direction: Vector3, force : number ){
        direction = direction.multiplyScalar(force);
        this.body.velocity.vadd(new CANNON.Vec3(direction.x, direction.y, direction.z));
    }

}