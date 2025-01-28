import { Vector3 } from "three";
import Component from "../../Engine/GameUtils/Component";
import InputController from "../../Engine/GameUtils/InputController";
import PlayerController from "./PlayerController";

export default class PlayerMovement extends Component {
    private controller !: PlayerController

    private speed : number = 100;
    
    constructor(){
        super()
    }

    Init(): void {
        this.controller = this.GetParent().GetComponent(PlayerController);
        if (!this.controller) {
            this.controller = new PlayerController();
            this.GetParent().AddComponent(this.controller);
        }
    }

    SetController(controller : PlayerController){       
        this.controller = controller;    
    }

    GetController() {
        return this.controller;
    }

    Update(deltatime: number): void {
        if (!this.controller) {
            return;
        }

        const distance = this.speed * deltatime; 
        let currentPosVec = new Vector3();

        if(this.controller.GetKey(this.controller.movementKey.forward)){
            currentPosVec.add(this.GetParent().transform.direction.forward as Vector3);
        }
        if(this.controller.GetKey(this.controller.movementKey.backward)){
            currentPosVec.sub(this.GetParent().transform.direction.forward as Vector3);
        }

        if(this.controller.GetKey(this.controller.movementKey.left)){
            currentPosVec.sub(this.GetParent().transform.direction.right as Vector3);
        }
        if(this.controller.GetKey(this.controller.movementKey.right)){
            currentPosVec.add(this.GetParent().transform.direction.right as Vector3);
        }

        this.GetParent().transform.AddVecteurPosition(currentPosVec.normalize(), distance);

        let currentRotVec = new Vector3()
        if (this.controller.GetKey(this.controller.movementKey.rotateLeft)) {
            currentRotVec.add(new Vector3(0, 2, 0))
        }
        if (this.controller.GetKey(this.controller.movementKey.rotateRight)) {
            currentRotVec.sub(new Vector3(0, 2, 0))
        }
        this.GetParent().transform.AddRotation(currentRotVec.x, currentRotVec.y, currentRotVec.z);
    }

}