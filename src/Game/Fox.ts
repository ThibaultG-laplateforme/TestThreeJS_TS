import * as THREE from 'three'
import { IGameObject } from '../Engine/interface/GameObject';

export class Fox implements IGameObject {
    private model !: THREE.Group;
    public animation : any = {}
    
    
    constructor(public readonly resource : any  ){
        //console.log(resource)
        this.setModel();
        this.setAnimation();
    }

    private setModel() {
        this.model = this.resource.scene;
        this.model.scale.set(0.2, 0.2, 0.2);
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true
            }
        })
        //console.log(this.model)
    }

    public getModel(){
        return this.model;
    }

    init(){

    }

    update(deltatime: number): void {
        this.animation.mixer.update(deltatime )
    }

    setAnimation() {
        
        this.animation.mixer = new THREE.AnimationMixer(this.model)
    
        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
    
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()
    
        // Change animation
        this.animation.play = (name : any) => {
          const newAction = this.animation.actions[name]
          const oldAction = this.animation.actions.current
    
          newAction.reset()
          newAction.play()
          newAction.crossFadeFrom(oldAction,1)
    
          this.animation.actions.current = newAction
          // we can test it in the console by writing 
          // window.experience.world.fox.animation.play('walking')
        }
        //console.log(this.animation)
    }

    setPosition(x: number, y: number, z: number): void {
        this.model.position.set(x, y, z);
    }

}