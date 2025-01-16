import * as THREE from 'three';

import { IGameObject } from "../interface/GameObject";
import { EventEmitter } from "../Utils/EventEmitter";
import Transform from './Transform';
import Component from './Component';
import { IGameEntity } from '../interface/GameEntity';

export default class GameObject extends EventEmitter implements IGameObject {
    name: string = "GameObject";
    readonly transform : Transform;

    private _parent : IGameEntity | null = null;
    private _components : Record<string, Component> = {};

    constructor(){
        super(); 
        this.transform = new Transform();
        this.AddComponent(this.transform);

        this.Init();
    }

    Init(): void {
        /*
        this.On('update.position', () => {console.info(`${this.name} update position`);})    
        this.On('update.rotation', () => {console.info(`${this.name} update rotation`);})    
        this.On('update.scale', () => {console.info(`${this.name} update scale`);})    
        */
    }

    Start(): void {
        
    }

    Update(deltatime: number): void {
        Object.keys(this._components).forEach((value) => {
            this._components[value].Update(deltatime);
        })
    }


//#region Get Set

    SetParent(parent : IGameEntity): void {
        this._parent = parent;
    }

    GetParent(): IGameEntity | null {
        return this._parent;
    }

    SetName(name: string): void {
        this.name = name;
    }

    GetName(): string {
        return this.name;
    }
//#endregion

//#region Component
    GetComponent<T>(componentClass: new ({...args}) => T): T | null {
        let component = this._components[componentClass.name];
        if (component === undefined) {
            console.error(`${this.name} don't have ${name} (component)`)
            return null
        }
        return component as T;
    }

    AddComponent(comp: Component): void {
        comp.SetParent(this);
        this._components[comp.constructor.name] = comp;

        comp.Init();
    }

    DeleteComponent<T>(componentClass: new () => T): void {
        let component : T | null; 
        component = this.GetComponent(componentClass);
        if (!component) {
            return;
        }
        // Check if method "OnDestroy" exist 
        if (typeof component['OnDestroy'] === 'function') {
            
            component.OnDestroy();
        }

        delete this._components[componentClass.name];
    }
//#endregion



}