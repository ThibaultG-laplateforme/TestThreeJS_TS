import * as THREE from 'three'
import { EventEmitter } from "./Utils/EventEmitter";
import { TResource, TLoaders } from "./interface/Resource";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export class Resources extends EventEmitter {

    private loadingManager = new THREE.LoadingManager(
        () => {
          this.emit('loaded')
        },
        (url: string, item: number, total: number) => {
          this.emit('progress', item / total)
        },
        (url: string) => {
          console.error(`Failed to load ${url}`)
        }
    )

    private loaders !: TLoaders;
    private itemLoad : Record<string, any> = {}
    
    constructor(private readonly resources : TResource[]) {
        super();
        this.initLoaders();
    }

    private initLoaders() {
        this.loaders = {
          gltf: new GLTFLoader(this.loadingManager),
          texture: new THREE.TextureLoader(this.loadingManager),
          cubeTexture: new THREE.CubeTextureLoader(this.loadingManager),
        }
    }

    private load() {
        if (this.resources.length === 0) {
            this.emit('loaded');
            return;
        }

        this.resources.forEach((resource) =>{
            switch (resource.type) {
                case 'gltf':
                    this.loaders.gltf.load(
                        resource.path,
                        (file) => { this.itemLoad[resource.name] = file; }
                    )
                    break;
                    
                case 'texture' :
                    this.loaders.texture.load(
                        resource.path,
                        (file) => { this.itemLoad[resource.name] = file; }
                    )
                    break;
                    
                case 'cubeTexture' :
                    this.loaders.cubeTexture.load(
                        resource.path,
                        (file) => { this.itemLoad[resource.name] = file; }
                    )
                    break;
            }
        })
    }

    
}