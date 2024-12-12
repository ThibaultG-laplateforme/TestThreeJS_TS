import { Camera } from "../Camera";
import { Engine } from "../Engine";
import { IGameEntity } from "./GameEntity";

export type TExperience = new (engine : Engine) => IExperience;
export interface IExperience extends IGameEntity {
    camera : Camera;


    init() : void;
} 