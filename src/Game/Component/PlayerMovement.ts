import { Vector3 } from "three";
import Component from "../../Engine/GameUtils/Component";
import InputController from "../../Engine/GameUtils/InputController";
import PlayerController from "./PlayerController";

export default class PlayerMovement extends Component {
    private controller !: PlayerController
    
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


        if(this.controller.GetKey(this.controller.movementKey.forward)){
            const currentVec = this.GetParent().transform.direction.forward;
            
            

            console.log();
            
            //sthis.GetParent().transform.AddVecteurPosition(vec);
        }
    }

}