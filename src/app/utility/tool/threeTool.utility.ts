import { Injectable, ElementRef } from "@angular/core";
import * as THREE from 'three';
import { OrbitControls } from "three-stdlib";

@Injectable({
    providedIn: 'root'
})
export class ThreeToolUtility {

  private controls!: OrbitControls;
  private light!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;

  public init(
    rendererContainer: ElementRef, 
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer): void {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(312, 420);
    renderer.setClearColor(0x000000, 0);
    rendererContainer.nativeElement.appendChild(renderer.domElement);
    camera.position.z = 5;

    this.light = new THREE.DirectionalLight(0xffffff, 4);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.light.position.set(0, 1, 1).normalize();
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 2048;
    this.light.shadow.mapSize.height = 2048;
    this.light.shadow.camera.near = 0.5;
    this.light.shadow.camera.far = 500;
    this.light.shadow.camera.left = -50;
    this.light.shadow.camera.right = 50;
    this.light.shadow.camera.top = 50;
    this.light.shadow.camera.bottom = -50;
    
    scene.add(this.light);
    scene.add(this.ambientLight);

    // Controls
    this.controls = new OrbitControls(camera, renderer.domElement);
    // Désactiver le zoom et le déplacement
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    
    // Désactiver la rotation de la caméra, uniquement l'objet tourne sur lui-même
    this.controls.enableRotate = true;

    // Désactiver l'inertie pour un contrôle plus précis
    this.controls.enableDamping = false;
  }

}