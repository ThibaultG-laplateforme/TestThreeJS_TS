import * as THREE from 'three'
import { Camera } from "../../Engine/Camera/Camera"
import { IExperience } from "../../Engine/interface/Experience"
import GameObject from '../../Engine/GameUtils/GameObject';

export default class CameraTPS extends Camera {
    private target !: GameObject;

    private positionOffSet !: THREE.Vector3;
    private lookAtOffSet !: THREE.Vector3;
    
    constructor(game : IExperience) {
        super(game, false);

        this.lookAtOffSet = new THREE.Vector3;

        this.SetPositionOffset(new THREE.Vector3(0, 20, -25));
        this.SetLookAtOffset(new THREE.Vector3(0, 5, 20));
    
    }



    SetPositionOffset(vec : THREE.Vector3) {
        this.positionOffSet = vec;
    }

    SetLookAtOffset(vec : THREE.Vector3) {
        this.lookAtOffSet = vec;
    }

    private CalculateOffset() {
        let calc = new THREE.Vector3();
        calc.copy(this.positionOffSet);
        calc.applyQuaternion(this.target.transform.quaternion);
        calc.add(this.target.transform.position);
        return calc;
    }

    private CalculateLookAt() {
        let calc = new THREE.Vector3();
        calc.copy(this.lookAtOffSet);
        calc.applyQuaternion(this.target.transform.quaternion);
        calc.add(this.target.transform.position);
        return calc;
    }

    public SetTarget(_target : GameObject) {
        this.target = _target;
    }  
    
    public Update(deltatime: number): void {
        if (this.target != undefined || this.target != null) {
            const offset = this.CalculateOffset();
            const lookAt = this.CalculateLookAt();            
            this.transform.SetVecteurPosition(offset);
            this.instance.lookAt(lookAt);
        }
    }
}