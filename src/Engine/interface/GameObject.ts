import { IGameEntity } from "./GameEntity";

export interface IGameObject extends IGameEntity {
    init() : void
    setPosition?(x : number, y : number, z : number) : void

}