import { Camera } from "../Camera";
import { GameEntity } from "./GameEntity";


export interface Experience extends GameEntity {
    camera : Camera;
    init() : void;
} 