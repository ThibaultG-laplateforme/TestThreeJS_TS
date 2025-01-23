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
        let currentVec = new Vector3();

        if(this.controller.GetKey(this.controller.movementKey.forward)){
            currentVec.add(this.GetParent().transform.direction.forward as Vector3);
        }
        if(this.controller.GetKey(this.controller.movementKey.backward)){
            currentVec.sub(this.GetParent().transform.direction.forward as Vector3);
        }

        if(this.controller.GetKey(this.controller.movementKey.left)){
            currentVec.sub(this.GetParent().transform.direction.right as Vector3);
        }
        if(this.controller.GetKey(this.controller.movementKey.right)){
            currentVec.add(this.GetParent().transform.direction.right as Vector3);
        }

        this.GetParent().transform.AddVecteurPosition(currentVec.normalize(), distance);
    }

}