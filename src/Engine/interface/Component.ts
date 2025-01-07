import { IGameEntity } from "./GameEntity";
import { ILinkable } from "./Linkable";

export type TComponent = IComponent | null; // | undefined;
export interface IComponent extends IGameEntity, ILinkable {


}