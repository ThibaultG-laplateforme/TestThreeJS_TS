import * as THREE from 'three'
import { Color } from '../Utils/Color';

export class EnviroDemo {

    

    constructor(private scene : THREE.Scene){
        this.init();
    }


    init(){
        this.scene.fog = new THREE.Fog(Color.BLACK, 10, 500);

        this.initLight();
    }


    private initLight(){
        const pointLight = new THREE.PointLight(Color.GREEN, 100, 200); // couleur, intensite, taille
        pointLight.position.set(10, 10, 10);
    
        const ambientLight = new THREE.AmbientLight(Color.WHITE);
        this.scene.add(pointLight, ambientLight);
    }
    

}