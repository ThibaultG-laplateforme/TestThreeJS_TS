import * as THREE from 'three';

import { IGameObject } from "../interface/GameObject";
import { EventEmitter } from "../Utils/EventEmitter";
import { TComponent } from '../interface/Component';
import Transform from './Transform';
import { Component } from './Component';

export class GameObject extends EventEmitter implements IGameObject {
    name: string = "GameObject";
    readonly transform : Transform;

    private _parent : GameObject | null = null;
    private _components : Record<string, Component> = {};

    constructor(){
        super(); 

        this.transform = new Transform();
        this.AddComponent(this.transform);

        this.Init();
    }

    Init(): void {
        this.On('update.position', () => {console.info(`${this.name} update position`);})    
    }

    Update(deltatime: number): void {
        
    }

    //--------------------- 

    SetParent(parent : GameObject): void {
        this._parent = parent;
    }

    GetParent(): GameObject | null {
        return this._parent;
    }

    //---------------------

    GetComponent(name: string): TComponent {
        let component = this._components[name];
        if (component === undefined) {
            console.error(`${this.name} don't have ${name} (component)`)
            return null
        }
        return component;
    }

    AddComponent(comp: Component): void {
        comp.SetParent(this);
        this._components[comp.constructor.name] = comp;

        comp.Init();
    }

    DeleteComponent(name: string): void {
        let component = this.GetComponent(name);
        if (!component) {
            return;
        }
        // Check if method "OnDestroy" exist 
        if (typeof component['OnDestroy'] === 'function') {
            component.OnDestroy();
        }

        delete this._components[name];
    }

    //---------------------------



}