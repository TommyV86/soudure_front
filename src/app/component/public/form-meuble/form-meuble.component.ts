import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ThreeToolUtility } from 'src/app/utility/tool/threeTool.utility';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-form-meuble',
  templateUrl: './form-meuble.component.html',
  styleUrls: ['./form-meuble.component.scss']
})
export class FormMeubleComponent implements OnInit {

  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private tableMesh!: THREE.Group;
  private shelfMesh!: THREE.Group;
  private controls!: OrbitControls;
  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  private gltfLoader: GLTFLoader = new GLTFLoader();
  private legMesh!: THREE.Group<THREE.Object3DEventMap>
  private woodTexture!: THREE.Texture;

  // Form data
  protected formData = {
    furnitureType: 'table',
    woodType: 'chene',
    size: 'petit',
    legType: 'type1'
  };

  protected sizesTable = ['petit', 'grand'];
  protected sizesShelf = ['petit', 'moyen', 'grand', 'tres grand'];
  protected woodTypes = ['chene', 'chataigner'];
  protected littleLegTypes = ['type1', 'type2', 'type3'];
  protected tallLegTypes = ['type1', 'type2'];

  protected woodTextures = {
    chene : 'assets/image/texture/b1.jpg',
    chataigner : '/assets/image/texture/bois.jpg'
  }  
  
  protected littleFlatPaths = {
    type_1: 'assets/glb/piece/table_basse/plateau/plateau_tb1.glb',
    type_2: 'assets/glb/piece/table_basse/plateau/plateau_tb2.glb'
  };

  protected tallFlatPaths = {
    type_1: 'assets/glb/piece/table/plateau/plateau_tl1.glb'
  };

  protected litteFeetPaths = {
    type_1: 'assets/glb/piece/table_basse/pieds/pieds_table_basse.glb',
    type_2: 'assets/glb/piece/table_basse/pieds/pieds_table_basse_2.glb',
    type_3: 'assets/glb/piece/table_basse/pieds/pieds_table_basse_3.glb'
  };

  protected tallFeetPaths = {
    type_1: 'assets/glb/piece/table/pieds/pieds_tl1.glb',
    type_2: 'assets/glb/piece/table/pieds/pieds_tl2.glb'
  };

  private tablePath! : string | undefined;
  private legPath! : string | undefined;
  private woodTexturePath!: string | undefined;
  private material!: THREE.MeshStandardMaterial;


  public constructor(private threeTollUtil: ThreeToolUtility) { }

  public ngOnInit(): void { }

  public ngAfterViewInit() {
    this.initThreeJS();
    this.animate();
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(312, 420);
    this.renderer.setClearColor(0x000000, 0);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 4);
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    light.position.set(0, 1, 1).normalize();
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = -50;
    light.shadow.camera.right = 50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    
    this.scene.add(light);
    this.scene.add(ambientLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enableRotate = true;
    this.controls.enableDamping = false;
  }

  private createFurniture(): void {
    if (this.tableMesh) {
      this.scene.remove(this.tableMesh);
    }
    if (this.shelfMesh) {
      this.scene.remove(this.shelfMesh);
    }

    // Charger le modèle approprié en fonction du type de meuble sélectionné
    if (this.formData.furnitureType === 'table') {
      this.loadTableModel();
    } else if (this.formData.furnitureType === 'etagere') {
      this.loadShelfModel();
    }
  }

  private loadTableModel(): void {
    // Charger le plateau
    this.tablePath = this.formData.size === 'petit' ? this.littleFlatPaths.type_1 : this.tallFlatPaths.type_1;

    this.gltfLoader.load(this.tablePath, (gltf) => {
        this.tableMesh = gltf.scene;

        // Charger la texture de bois
        this.woodTexturePath = this.woodTextures[this.formData.woodType as keyof typeof this.woodTextures];
        this.woodTexture = this.textureLoader.load(this.woodTexturePath);

        this.woodTexture.repeat.set(1, 1);  // Ajuster la répétition de la texture
        this.woodTexture.wrapS = THREE.RepeatWrapping;
        this.woodTexture.wrapT = THREE.RepeatWrapping;

        // Appliquer la texture et ajuster le matériau
        this.material = new THREE.MeshStandardMaterial({
            map: this.woodTexture,
            roughness: 0.7,  // Ajuster la rugosité
            metalness: 0.1   // Ajuster le métal
        });

        this.tableMesh.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).material = this.material;
            }
        });

        // Appliquer le scaling au plateau
        if(this.formData.size === 'petit'){
          this.tableMesh.scale.set(2.5, 2.5, 2.5);
        } else {
          this.tableMesh.scale.set(3, 3, 3);
        }
        

        this.scene.add(this.tableMesh);

        // Charger les pieds après avoir chargé le plateau
        switch (this.formData.size) {
            case 'petit':
                switch (this.formData.legType) {
                    case 'type1':
                        this.legPath = this.litteFeetPaths.type_1;
                        break;
                    case 'type2':
                        this.legPath = this.litteFeetPaths.type_2;
                        break;
                    case 'type3':
                        this.legPath = this.litteFeetPaths.type_3;
                        break;
                    default:
                        console.error('Type de pieds inconnu pour petite table:', this.formData.legType);
                        break;
                }
                break;
            case 'grand':
                switch (this.formData.legType) {
                    case 'type1':
                        this.legPath = this.tallFeetPaths.type_1;
                        break;
                    case 'type2':
                        this.legPath = this.tallFeetPaths.type_2;
                        break;
                    default:
                        console.error('Type de pieds inconnu pour grande table:', this.formData.legType);
                        break;
                }
                break;
            default:
                console.error('Taille de table inconnue:', this.formData.size);
                break;
        }

        if (this.legPath) {
            this.gltfLoader.load(this.legPath, (legGltf) => {
              this.legMesh = legGltf.scene;

              if(this.formData.size === 'petit'){
                this.legMesh.position.set(0, 0.32, 0)
              } else {
                this.legMesh.scale.set(0.6, 0.6, 0.6);
              };
              // Ajouter les pieds à la table
              this.tableMesh.add(this.legMesh);
            });
        }
    });
  }

  
  
  private loadShelfModel(): void {
    // Charger le modèle de l'étagère
    const shelfPath = this.tallFlatPaths.type_1; 
    this.gltfLoader.load(shelfPath, (gltf) => {
      this.shelfMesh = gltf.scene;
  
      // Appliquer le scaling
      this.shelfMesh.scale.set(1.5, 1.5, 1.5);
  
      this.scene.add(this.shelfMesh);
    });
  }  

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  protected onSubmit(): void {
    this.createFurniture();
  }
}
