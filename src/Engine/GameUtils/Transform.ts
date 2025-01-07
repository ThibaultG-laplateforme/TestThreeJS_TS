import * as THREE from 'three'
import { Component } from "./Component";

export default class Transform extends Component {
    readonly position : THREE.Vector3;
    readonly quaternion : THREE.Quaternion;
    readonly scaler : THREE.Vector3;
    
    constructor() {
        super();

        this.position = new THREE.Vector3();
        this.quaternion = new THREE.Quaternion();
        this.scaler = new THREE.Vector3();
    }

    GetPosition() {
        return this.position;
    }

    SetPosition(newPos : THREE.Vector3) : void {
        this.position.copy(newPos);

        this.GetParent()?.Emit('update.position', this.position);
    }

    GetQuaternion(){
        return this.quaternion;
    }

    GetScaler(){
        return this.scaler;
    }

    SetScaler(newScale : THREE.Vector3) : void {
        this.scaler.copy(newScale);

        this.GetParent()?.Emit('update.scale');
    }


}