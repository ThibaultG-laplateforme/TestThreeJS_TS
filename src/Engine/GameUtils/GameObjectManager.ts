import { IGameEntity } from "../interface/GameEntity";
import GameObject from "./GameObject";

export default class GameObjectManager implements IGameEntity {
    // TODO: make GOManager
    private ids : number = 0;
    private gameObjects : Record<string, GameObject> = {}
    
    constructor(){

    }

    Init(): void {
        
    }

    Add(gameObject : GameObject, name : string) : void {
        if (!name) {
            this.ids += 1;
            name = `${gameObject.constructor.name}_${this.ids}` ;
        }

        this.gameObjects[name] = gameObject;

        gameObject.SetParent(this);
        gameObject.SetName(name);
    }

    Get(name : string) : GameObject {
        return this.gameObjects[name];
    }

    Remove(name : string) : GameObject {
        let go = this.gameObjects[name];

        delete this.gameObjects[name];

        console.log(go);

        return go;
    }

    Update(deltatime: number): void {
        Object.keys(this.gameObjects).forEach((value) => {
            this.gameObjects[value].Update(deltatime);
        })
    }
}