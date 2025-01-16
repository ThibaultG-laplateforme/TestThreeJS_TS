import Component from "./Component";

export default class InputController extends Component {
    public keys : any = {}
    public mouseBTN : any = {}

    constructor() {
        super();
        document.addEventListener('keydown', (e)=>{this.UpdateKeyTable(e, true); this.OnKeyDown(e);}, false);
        document.addEventListener('keyup', (e)=>{this.UpdateKeyTable(e, false); this.OnKeyUp(e);}, false);

        document.addEventListener('mousedown', (e)=>{this.UpdateMouseBTN(e, true), this.OnMouseDown(e);}, false);
        document.addEventListener('mouseup', (e)=>{this.UpdateMouseBTN(e, false), this.OnMouseUp(e);}, false);
        
    }

    
//#region Keyboard
    SetKeyTable(newTable : string[]) {
        this.keys = {};
        for (const key in newTable) {
            this.keys[newTable[key]] = false;
        }
        console.log(this.keys)
    }

    AddInKeyTable(keys : string | string[]) {
        if (typeof keys === 'string') {
            keys = [keys];
        }
        
        for (const key in keys) {
            this.keys[keys[key]] = false;
        }
        console.log(this.keys)
    }

    RemoveInKeyTable(keys : string | string[]) {
        if (typeof keys === 'string') {
            keys = [keys];
        }

        for (const key in keys) {
            delete this.keys[keys[key]];
        }
        console.log(this.keys);
    }

    protected UpdateKeyTable(key : KeyboardEvent, isDown : boolean){
        if (this.keys[key.key] === undefined) {
            console.log(key.key + ' key is not register')
            return;
        }
        this.keys[key.key] = isDown;
    }

    OnKeyDown(key : KeyboardEvent) {        
    }
    
    OnKeyUp(key : KeyboardEvent) {
    }
//#endregion

//#region Mouse
    protected UpdateMouseBTN(click : MouseEvent, isDown : boolean){
        this.mouseBTN[click.button] = isDown;
    }

    OnMouseDown(click : MouseEvent) {        
    }
    
    OnMouseUp(click : MouseEvent) {
    }
//#endregion
}