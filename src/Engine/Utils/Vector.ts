import * as THREE from "three";

export class Vector3 extends THREE.Vector3 {
    _right : THREE.Vector3 = new THREE.Vector3(-1, 0, 0);
    _top : THREE.Vector3 = new THREE.Vector3(0, 1, 0);
    _forward : THREE.Vector3 = new THREE.Vector3(0, 0, 1);
    
    _zero : THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    _one : THREE.Vector3 = new THREE.Vector3(1, 1, 1);
    
}