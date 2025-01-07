import { IComponent } from "../interface/Component";
import { IGameObject } from "../interface/GameObject";
import { ILinkable, TLinkable } from "../interface/Linkable";
import { EventEmitter } from "../Utils/EventEmitter";
import { GameObject } from "./GameObject";

export class Component extends EventEmitter implements IComponent {
    
    private _parent : GameObject | null = null;
    
    constructor(){
        super();
    }

    Init(): void {
        
    }

    Update(deltatime: number): void {
        
    }

    SetParent(newParent: GameObject): void {
        this._parent = newParent;
    }

    GetParent(): GameObject | null {
        return this._parent;
    }
}