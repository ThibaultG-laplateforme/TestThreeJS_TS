import * as THREE from 'three'
import Component from "./Component";
import { Vector3 } from '../Utils/Vector';
import { DegreesToRadians } from '../Utils/Math';

export default class Transform extends Component {
    readonly position : THREE.Vector3;
    readonly quaternion : THREE.Quaternion;
    readonly scaler : THREE.Vector3;

    readonly direction : any = {
        forward : THREE.Vector3,
        right : THREE.Vector3,
        top : THREE.Vector3
    }
    
    constructor() {
        super();

        this.position = new THREE.Vector3();
        this.quaternion = new THREE.Quaternion();
        this.scaler = new THREE.Vector3();

        this.direction = {
            forward : new THREE.Vector3(),
            right : new THREE.Vector3(),
            top : new THREE.Vector3()
        }

        this.UpdateDirectionVector();
    }

//#region Position
    GetPosition() {
        return this.position;
    }

    SetVecteurPosition(newPos : THREE.Vector3) : void {
        this.position.copy(newPos);

        this.GetParent()?.Emit('update.position', this.position);
    }

    SetPosition(x : number, y : number, z : number){
        this.SetVecteurPosition(new THREE.Vector3(x, y, z));
    }

    AddPosition(x : number, y : number, z : number) {
        x += this.GetPosition().x;
        y += this.GetPosition().y;
        z += this.GetPosition().z;

        this.SetVecteurPosition(new THREE.Vector3(x, y, z));
    }

    AddVecteurPosition(direction : THREE.Vector3, distance : number = 0) {
        distance = distance === 0 ? 1 : distance;

        const newPos = this.GetPosition();
        newPos.x += direction.x * distance;
        newPos.y += direction.y * distance;
        newPos.z += direction.z * distance;
        
        this.SetVecteurPosition(newPos);
    }
//#endregion

//#region Rotation

    //TODO: Système de point d'ancrage pour les rotations

    GetQuaternion(){
        return this.quaternion;
    }

    SetRotation(x : number, y : number, z : number){
        const newQuaternion = this.MakeQuaternion(x, y, z);

        this.quaternion.copy( newQuaternion.qx.multiply(newQuaternion.qy).multiply(newQuaternion.qz) );

        this.UpdateDirectionVector();
    }
    
    AddRotation(x : number, y : number, z : number) {
        const newQuaternion = this.MakeQuaternion(x, y, z);

        this.quaternion.multiply(newQuaternion.qx).multiply(newQuaternion.qy).multiply(newQuaternion.qz)

        this.UpdateDirectionVector();        
    }
    
    private MakeQuaternion(x : number, y : number, z : number) {
        const qx = new THREE.Quaternion().setFromAxisAngle(new Vector3()._right, DegreesToRadians(x));
        const qy = new THREE.Quaternion().setFromAxisAngle(new Vector3()._top, DegreesToRadians(y));
        const qz = new THREE.Quaternion().setFromAxisAngle(new Vector3()._forward, DegreesToRadians(z));

        return {qx, qy, qz}
    }

    private UpdateDirectionVector() {
        const fv = new Vector3()._forward.applyQuaternion(this.quaternion); 
        const rv = new Vector3()._right.applyQuaternion(this.quaternion); 
        const tv = new Vector3()._top.applyQuaternion(this.quaternion); 
        
        this.direction.forward.copy(fv);
        this.direction.right.copy(rv);
        this.direction.top.copy(tv);

        this.GetParent()?.Emit('update.rotation', this.quaternion);
    }
//#endregion

//#region Scaler
    GetScaler(){
        return this.scaler;
    }

    SetScaler(newScale : THREE.Vector3) : void {
        this.scaler.copy(newScale);

        this.GetParent()?.Emit('update.scale', this.scaler);
    }
//#endregion

}