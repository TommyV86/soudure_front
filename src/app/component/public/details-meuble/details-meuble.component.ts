import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meuble } from 'src/app/model/meuble/meuble';
import { MeubleService } from 'src/app/service/meuble-service/meuble.service';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three-stdlib';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ThreeToolUtility } from 'src/app/utility/tool/threeTool.utility';

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
  private meubleSubbed!: Meuble | null | undefined;
  private meubleSubject = new BehaviorSubject<Meuble | null | undefined>(null);
  private meubleSubscription: Subscription | undefined;


  public constructor(
    private route: ActivatedRoute,
    private meubleServ: MeubleService,
    private threeToolUtil: ThreeToolUtility
  ){}

  public ngOnInit() : void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      this.productName = String(params.get('nom'));
    })
    this.getProductByName();
  }

  public ngAfterViewInit(): void {

    this.meubleSubscription = this.meubleSubject.subscribe(meubleSubbed => {
      if (this.canvasRef && meubleSubbed) {
        this.threeToolUtil.init(this.canvasRef, window.innerWidth, window.innerHeight)
        this.scene = this.threeToolUtil.scene;
        this.camera = this.threeToolUtil.camera;
        this.renderer = this.threeToolUtil.renderer;
        this.loadModel();
        this.threeToolUtil.animate();
      }
    })
  }

  public ngOnDestroy(): void {
    // Unsubscribe from meubleSubbedSubject to prevent memory leaks
    this.meubleSubscription?.unsubscribe();
    window.removeEventListener('resize', this.onWindowResize);
  }

  public getProductByName() : void {
    this.loading = true; 
    this.meubleServ.getByName(this.productName).subscribe({
      next:(data: Meuble)=>{
        this.meuble = data;
        this.meubleSubbed = this.meuble;
        this.meubleSubject.next(this.meubleSubbed);   
      },
      error:(e)=>{
        console.log('error : ', e);
      },
      complete:()=>{
        this.loading = false;
      }
    })
  }

  private loadModel(): void {
    const loader = new GLTFLoader();
    loader.load(`assets/glb/${this.meuble._typeMeubleDto?._nom}/${this.productName}.glb`, (gltf) => {
      this.model = gltf.scene;
      this.updateModelSize();
      this.centerObject();
      this.scene.add(this.model);
    }, undefined, function (error) {
      console.error(error);
    });
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

  private updateModelSize(): void {
    if (this.model) {
      // grands meubles
      if (this.meuble._longueur != null && this.meuble._longueur >= 190) {
        this.model.scale.set(1.5, 1.5, 1.5);
      // petits meubles
      } else if (this.meuble._longueur != null 
              && this.meuble._longueur >= 100 
              && this.meuble._typeMeubleDto?._nom != 'étagere' 
              && this.meuble._nom != 'Table Basse Omega'
      ) {
        this.model.scale.set(3, 3, 3);
      // etageres     
      } else if (this.meuble._longueur != null 
              && this.meuble._nom == 'Table Basse Omega' 
              || this.meuble._hauteur != null 
              && this.meuble._hauteur >= 147 
      ) {
        this.model.scale.set(2, 2, 2);
      }
    }
  }
}