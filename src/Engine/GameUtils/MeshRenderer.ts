import * as THREE from "three";
import Component from "./Component";

export default class MeshRenderer extends Component {
    private _renderer !: THREE.Object3D;
    
    constructor(){
        super();
    }

    Init(): void {
        this.InitEvent();
    }
    
    private InitEvent(): void{        
        this.GetParent()?.On('update.position', (newPosition : THREE.Vector3) => { this.UpdatePosition(newPosition); })
        this.GetParent()?.On('update.rotation', (newQuaternion : THREE.Quaternion) => { this.UpdateQuaternion(newQuaternion); })
        this.GetParent()?.On('update.scale', (newScale : THREE.Vector3) => { this.UpdateScale(newScale); })
    }

    private UpdateData(){
        this.UpdatePosition(this.GetParent()?.transform.position);
        this.UpdateQuaternion(this.GetParent()?.transform.quaternion);
        this.UpdateScale(this.GetParent()?.transform.scaler);
    }

    private UpdatePosition(newPosition : THREE.Vector3 | undefined): void {
        if (!this.CheckIfRendererIsValid(newPosition, 'position')) {
            return;
        }
        
        this._renderer.position.copy(newPosition);
        //console.log(`(${this.GetParent()?.name}) Mesh position is update !`);
    }
    
    private UpdateQuaternion(newQuaternion : THREE.Quaternion | undefined): void {
        if (!this.CheckIfRendererIsValid(newQuaternion, 'quaternion')) {
            return;
        }
        
        this._renderer.quaternion.copy(newQuaternion);
        //console.log(`(${this.GetParent()?.name}) Mesh rotation is update !`);
    }
    
    private UpdateScale(newScale : THREE.Vector3 | undefined): void {
        if (!this.CheckIfRendererIsValid(newScale, 'scale')) {
            return;
        }

        this._renderer.scale.copy(newScale);
        //console.log(`(${this.GetParent()?.name}) Mesh scale is update !`);
    }

    private CheckIfRendererIsValid(valueToCheck : THREE.Vector3 | THREE.Quaternion | undefined, type : 'position'| 'quaternion' | 'scale') : boolean {
        if (!valueToCheck) {
            console.error(`(${this.GetParent()?.name}) Renderer ${type} was undefined`)
            return false;
        }

        if (!this._renderer) {
            console.error(`(${this.GetParent()?.name}) Renderer is not valid !`)
            return false;
        }
        return true;
    }

    //------------------------------

    //TODO: voir pour faciliter la gestion/creation des mesh
    CreateMesh(geometry : THREE.BufferGeometry, material : THREE.Material){
        this._renderer = new THREE.Mesh(geometry, material);
    }

    SetRenderer(renderer : THREE.Object3D): void {
        this._renderer = renderer;
        this.UpdateData();
    }

    GetRenderer() : THREE.Object3D {
        return this._renderer;
    }

    OnDestroy(): void {
        this._renderer.parent?.remove(this._renderer)
    }

    
}