
import { IComponent, TComponent } from "./Component";
import { IGameEntity } from "./GameEntity";
import { ILinkable } from "./Linkable";

export type TGameObject = IGameEntity | null;
export interface IGameObject extends IGameEntity, ILinkable {
    
    //public Variables
    name : string;
    transform : IComponent;

    GetComponent(name : string) : TComponent;
    AddComponent(comp : IComponent) : void;
    DeleteComponent(name : string) : void

    
}