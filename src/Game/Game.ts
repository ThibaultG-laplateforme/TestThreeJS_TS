import * as THREE from 'three'
import { Camera } from '../Engine/Camera';


export class Game {
    public readonly scene !: THREE.Scene;
    public readonly renderer !: THREE.WebGLRenderer;
    public readonly camera !: Camera;
    public readonly canvas !: HTMLCanvasElement;

    public torus !:  THREE.Mesh;
    public moon !:  THREE.Mesh;

    constructor(canvas : HTMLCanvasElement){
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({antialias : false, canvas : canvas})
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.canvas = canvas;
        this.camera = new Camera(this);

        this.initObject();
        this.initLight();
        this.initDebug();
        
        window.requestAnimationFrame(() => this.update())
    }

    private initObject() {
        // --- Créer un Donut -----------------
        const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); //Objet
        // Un MeshBasicMaterial est unlit
        // Un MeshStandardMaterial est lit
        const material = new THREE.MeshStandardMaterial( { color: 0xffffff } ); //Shader
        this.torus = new THREE.Mesh( geometry, material ); //composition de l'objet+shader
        // ---------------------
        
        
        const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);

        const sphereTexture = new THREE.TextureLoader().load("../../public/img/moon.jpg");
        const sphereNormal = new THREE.TextureLoader().load("../../public/img/moonNormal.jpg");
        
        const sphereMaterial = new THREE.MeshStandardMaterial({map: sphereTexture, normalMap: sphereNormal});
        this.moon = new THREE.Mesh(sphereGeometry, sphereMaterial);
        
        this.moon.position.z = 20;
        this.moon.position.setX(-10);
        
        
        this.scene.add( this.torus, this.moon ); //Ajout dans la scène en position  0, 0, 0
    

        Array(200).fill().forEach(() => this.addStar());


        // Background
        const spaceTexture = new THREE.TextureLoader().load('../../public/img/space.jpg');
        this.scene.background = spaceTexture;

    }


    private addStar() {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);
      
        const [x, y, z] = Array(3)
          .fill()
          .map(() => THREE.MathUtils.randFloatSpread(400) );
      
        star.position.set(x, y, z);

        this.scene.add(star);
    }
      

    


    private initLight() {
        const pointLight = new THREE.PointLight(0xff0000, 100, 200); // couleur, intensite, taille
        pointLight.position.set(10, 10, 10);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(pointLight, ambientLight);
    }
    
    private initDebug() {
        // Helper, Debug
        //const lightHelper = new THREE.PointLightHelper(pointLight)
        const gridHelper = new THREE.GridHelper(200, 50);
        this.scene.add(gridHelper);      
    }

    update() {
    const step = () => {
        requestAnimationFrame(step)
        //const elapsedTime = this.clock.getElapsedTime()
        //this.deltaTime = elapsedTime - this.currentTime
        //this.currentTime = elapsedTime
        //this.engine.update(this.deltaTime)

        this.camera.update(0);
    
        this.torus.rotation.x += 0.01;
        
        this.moon.rotation.y += 0.001;
    
        this.renderer.render(this.scene, this.camera.instance);
    }
    step()
    }


}