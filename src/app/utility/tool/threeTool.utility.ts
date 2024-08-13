import { Injectable, ElementRef } from "@angular/core";
import * as THREE from 'three';
import { OrbitControls } from "three-stdlib";

@Injectable({
    providedIn: 'root'
})
export class ThreeToolUtility {

  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;
  public controls!: OrbitControls;
  public light!: THREE.DirectionalLight;
  public ambientLight!: THREE.AmbientLight;

  public init(
    rendererContainer: ElementRef,
    width: number,
    height: number
  ): void {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });;
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Le second paramètre 0 rend le fond transparent
    this.renderer.setPixelRatio(window.devicePixelRatio);
    rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;

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
    
    this.scene.add(this.light);
    this.scene.add(this.ambientLight);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // Désactiver le zoom et le déplacement
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    
    // Désactiver la rotation de la caméra, uniquement l'objet tourne sur lui-même
    this.controls.enableRotate = true;

    // Désactiver l'inertie pour un contrôle plus précis
    this.controls.enableDamping = false;
  }

  public animate(): void {
    requestAnimationFrame(() => this.animate());
    //this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}