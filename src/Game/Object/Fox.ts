import * as THREE from 'three'
import GameObject from '../../Engine/GameUtils/GameObject';
import MeshRenderer from '../../Engine/GameUtils/MeshRenderer';

export class Fox extends GameObject {
    public readonly resource : any;
    public animation : any = {}
    
    
    constructor( resource : any  ){
        super();
        this.resource = resource;        
    }
    
    
    Start() {
        this.SetModel();
        this.SetAnimation();

        this.transform.SetRotation(0, 0, 0);
    }

    private SetModel() {

        let model = this.resource.scene;
        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })

        let meshRenderer = new MeshRenderer();
        this.AddComponent(meshRenderer);
        meshRenderer.SetRenderer(model);

        this.transform.SetScaler(new THREE.Vector3(0.2, 0.2, 0.2));
        //this.transform.SetPosition(0, 0, 0);
    }

    public GetModel() : THREE.Object3D {
        let model = this.GetComponent(MeshRenderer);
        return model.GetRenderer();
    }


    Update(deltatime: number): void {
        super.Update(deltatime);
        this.animation.mixer.update(deltatime)

        //let dir = this.transform.direction;
        //this.transform.AddVecteurPosition(dir.forward, 20*deltatime);
        //this.transform.AddRotation(90 * deltatime, 0, 0);
    }

    SetAnimation() {
        
        let model = this.GetComponent(MeshRenderer);
        if (!model) {
            return;
        }
        this.animation.mixer = new THREE.AnimationMixer(model.GetRenderer());
    
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



}