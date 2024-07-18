import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meuble } from 'src/app/model/meuble/meuble';
import { MeubleService } from 'src/app/service/meuble-service/meuble.service';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three-stdlib';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-details-meuble',
  templateUrl: './details-meuble.component.html',
  styleUrls: ['./details-meuble.component.scss']
})
export class DetailsMeubleComponent implements AfterViewInit, OnDestroy {

  protected loading!: boolean;
  protected productName!: string;
  protected meuble!: Meuble;

  @ViewChild('canvasContainer', { static: false }) canvasRef!: ElementRef;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private model!: THREE.Object3D;
  private controls!: OrbitControls;
  private typeNameSubject = new BehaviorSubject<string | null | undefined>(null);
  private typeName!: string | null | undefined;
  private typeNameSubscription: Subscription | undefined;
  private height: Subscription | undefined;
  private weight: Subscription | undefined;

  public constructor(
    private route: ActivatedRoute,
    private meubleServ: MeubleService
  ){}

  public ngOnInit() : void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      this.productName = String(params.get('nom'));
    })
    this.getProductByName();
  }

  public ngAfterViewInit(): void {

    this.typeNameSubscription = this.typeNameSubject.subscribe(typeName => {
      if (this.canvasRef && typeName) {
        this.initThreeJS();
        this.loadModel();
        this.animate();
      } else {
        console.error('canvasRef or typeName is not defined');
      }}
    )
  }

  public ngOnDestroy(): void {
    // Unsubscribe from typeNameSubject to prevent memory leaks
    this.typeNameSubscription?.unsubscribe();
    window.removeEventListener('resize', this.onWindowResize);
  }

  public getProductByName() : void {
    this.loading = true; 
    this.meubleServ.getByName(this.productName).subscribe({
      next:(data: Meuble)=>{
        this.meuble = data;
        console.log('product', this.meuble);      
        this.typeName = this.meuble._typeMeubleDto?._nom;
        this.typeNameSubject.next(this.typeName);   
      },
      error:(e)=>{
        console.log('error : ', e);
      },
      complete:()=>{
        this.loading = false;
        console.log('get by name complete');
      }
    })
  }

  //------methodes pour la manipulation des objets 3d---------//
  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff); 
    this.canvasRef.nativeElement.appendChild(this.renderer.domElement);

    // Ajouter des lumières à la scène
    const light = new THREE.DirectionalLight(0xffffff, 1);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    light.position.set(0, 1, 1).normalize();
    this.scene.add(light);
    this.scene.add(ambientLight);

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

  private loadModel(): void {
    const loader = new GLTFLoader();
    loader.load(`assets/${this.meuble._typeMeubleDto?._nom}/${this.productName}.glb`, (gltf) => {
      this.model = gltf.scene;

      //condition à mettre en place avec hauteur et largeur : 
      // pour les grands meubles : 
      this.model.scale.set(2, 2, 2)
      //this.model.scale.set(3, 3, 3); // Exemple d'échelle doublée
      this.centerObject();
      this.scene.add(this.model);
    }, undefined, function (error) {
      console.error(error);
    });
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    // Faire tourner l'objet sur lui-même
    // if (this.model) {
    //   const axis = new THREE.Vector3(0, 1, 0); // Axe Y local
    //   const angle = 0.01; // Ajustez la valeur pour contrôler la vitesse de rotation
    //   this.model.rotateOnAxis(axis, angle);
    // }
  

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private centerObject(): void {
    if (this.model) {
      // Récupérer les dimensions de l'objet pour déterminer son centre
      const bbox = new THREE.Box3().setFromObject(this.model);
      const center = bbox.getCenter(new THREE.Vector3());
  
      // Calculer le décalage pour centrer l'objet
      const offset = center.clone().negate();
  
      // Déplacer l'objet pour le centrer autour de son pivot
      this.model.position.add(offset);
    }
  }
}