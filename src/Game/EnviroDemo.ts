import * as THREE from 'three'
import { IGameEntity } from '../Engine/interface/GameEntity';

export class EnviroDemo implements IGameEntity {

    

    constructor(private scene : THREE.Scene){
        this.init();
    }


    init(){
        this.scene.fog = new THREE.Fog("black", 10, 500);

        this.initLight();
    }


    private initLight(){
        const pointLight = new THREE.PointLight("green", 100, 200); // couleur, intensite, taille
        pointLight.position.set(10, 10, 10);
    
        const ambientLight = new THREE.AmbientLight("white");
        this.scene.add(pointLight, ambientLight);
    }
    
    update(deltatime: number): void {
        
    }

}