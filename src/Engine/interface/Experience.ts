import { Camera } from "../Camera";
import { Engine } from "../Engine";
import { IGameEntity } from "./GameEntity";
import { TResource } from "./Resource";

export type TExperience = new (engine : Engine) => IExperience;
export interface IExperience extends IGameEntity {
    engine : Engine;
    camera : Camera;

    resources : TResource[]

    init() : void;
} 