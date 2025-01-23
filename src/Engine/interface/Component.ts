import { Vector3 } from "three";
import { IGameEntity } from "./GameEntity";
import { ILinkable } from "./Linkable";

export type TComponent = IComponent | null; // | undefined;
export interface IComponent extends IGameEntity, ILinkable {

    Start() : void


}


export interface IDirection {
    forward : Vector3;
    right : Vector3,
    top : Vector3
}