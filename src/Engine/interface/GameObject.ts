
import { Component } from "../GameUtils/Component";
import { IComponent } from "./Component";
import { IGameEntity } from "./GameEntity";
import { ILinkable } from "./Linkable";

export type TGameObject = IGameEntity | null;
export interface IGameObject extends IGameEntity, ILinkable {
    
    //public Variables
    
    transform : IComponent;

    Start() : void

    GetComponent<T>(componentClass : new () => T) : T | Component | null;
    AddComponent(comp : Component) : void;
    DeleteComponent<T>(componentClass : new () => T) : void

    SetName(name : string) : void
    GetName() : string
    
}