import { IGameEntity } from "./GameEntity";

export type TLinkable = ILinkable | null;
export interface ILinkable {
    GetParent() : IGameEntity | null;
    SetParent(newParent : IGameEntity) : void;
}
