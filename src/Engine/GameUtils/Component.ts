import { IComponent } from "../interface/Component";
import { EventEmitter } from "../Utils/EventEmitter";
import { GameObject } from "./GameObject";

export default class Component extends EventEmitter implements IComponent {
    
    private _parent : GameObject | null = null;
    
    constructor(){
        super();
    }

    Init(): void {
        
    }

    Start(): void {
        
    }

    Update(deltatime: number): void {
        
    }

    SetParent(newParent: GameObject): void {
        this._parent = newParent;
    }

    GetParent(): GameObject | null {
        return this._parent;
    }

    OnDestroy(): void {
        
    }
}