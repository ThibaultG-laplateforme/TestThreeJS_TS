import InputController from "../../Engine/GameUtils/InputController";


export default class PlayerController extends InputController {
    public movementKey : any;

    constructor(){
        super();

        this.movementKey = {
            forward : "z",
            backward : "s",
            left : "q",
            right : "d",
            jump : " "
        }
    
        this.SetKeyTable([
            this.movementKey.forward, 
            this.movementKey.backward, 
            this.movementKey.left, 
            this.movementKey.right, 
            this.movementKey.jump 
        ])
    }
}