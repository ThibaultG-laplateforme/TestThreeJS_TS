import * as THREE from 'three'
import { IGameEntity } from '../Engine/interface/GameEntity';
import { Engine } from '../Engine/Engine';
import { DirtFloor } from './staticObject/DirtFloor';

export class EnviroDemo implements IGameEntity {
    dirtGround !: DirtFloor 
    

    constructor(private engine : Engine){
        this.Init();
    }


    Init(){
        this.engine.scene.fog = new THREE.Fog("black", 10, 500);

        this.InitLight();

        this.dirtGround = new DirtFloor(this.engine.resources);
        this.engine.scene.add(this.dirtGround.mesh);

    }


    private InitLight(){
        const pointLight = new THREE.PointLight("green", 100, 200); // couleur, intensite, taille
        pointLight.position.set(10, 10, 10);
    
        const ambientLight = new THREE.AmbientLight("white");
        this.engine.scene.add(pointLight, ambientLight);
    }
    
    Update(deltatime: number): void {
        
    }

}