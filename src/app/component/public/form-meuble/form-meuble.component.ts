import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConstantUtility } from 'src/app/utility/constant/constant.utility';
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
  private material!: THREE.MeshStandardMaterial;

  private tablePath! : string | undefined;
  private legPath! : string | undefined;
  private woodTexturePath!: string | undefined;
  public isLoading: boolean = false;
  
  // Form data
  protected formData = this.constantUtil.formData;
  protected woodTypes = this.constantUtil.woodTypes;
  protected sizesTable = this.constantUtil.sizesTable;
  protected sizesShelf = this.constantUtil.sizesShelf;
  protected littleLegTypes = this.constantUtil.littleLegTypes;
  protected tallLegTypes = this.constantUtil.tallLegTypes;

  public constructor(
    private threeTollUtil: ThreeToolUtility,
    private constantUtil: ConstantUtility
  ) { }

  public ngOnInit(): void { }

  public ngAfterViewInit() {
    this.threeTollUtil.init(this.rendererContainer, 306, 420)
    this.scene = this.threeTollUtil.scene;
    this.camera = this.threeTollUtil.camera;
    this.renderer = this.threeTollUtil.renderer;
    this.threeTollUtil.animate();
  }

  private createFurniture(): void {
    if (this.tableMesh) {
      this.scene.remove(this.tableMesh);
    }
    if (this.shelfMesh) {
      this.scene.remove(this.shelfMesh);
    }

    // Charger le modèle approprié en fonction du type de meuble sélectionné
    if (this.constantUtil.formData.furnitureType === 'table') {
      this.loadTableModel();
    } else if (this.constantUtil.formData.furnitureType === 'etagere') {
      this.loadShelfModel();
    }
  }

  private loadTableModel(): void {
    // Charger le plateau
    this.isLoading = true;

    this.tablePath = this.constantUtil.formData.size === 'petit' ? 
                     this.constantUtil.littleFlatPaths.type_1 : this.constantUtil.tallFlatPaths.type_1;

    this.gltfLoader.load(this.tablePath, (gltf) => {
        this.tableMesh = gltf.scene;

        // Charger la texture de bois
        this.woodTexturePath = this.constantUtil.woodTextures[this.constantUtil.formData.woodType as keyof typeof this.constantUtil.woodTextures];
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
        if(this.constantUtil.formData.size === 'petit'){
          this.tableMesh.scale.set(2.5, 2.5, 2.5);
        } else {
          this.tableMesh.scale.set(3, 3, 3);
        }
        


        // Charger les pieds après avoir chargé le plateau
        switch (this.constantUtil.formData.size) {
            case 'petit':
                switch (this.constantUtil.formData.legType) {
                    case 'type1':
                        this.legPath = this.constantUtil.litteFeetPaths.type_1;
                        break;
                    case 'type2':
                        this.legPath = this.constantUtil.litteFeetPaths.type_2;
                        break;
                    case 'type3':
                        this.legPath = this.constantUtil.litteFeetPaths.type_3;
                        break;
                    default:
                        console.error('Type de pieds inconnu pour petite table:', this.constantUtil.formData.legType);
                        break;
                }
                break;
            case 'grand':
                switch (this.constantUtil.formData.legType) {
                    case 'type1':
                        this.legPath = this.constantUtil.tallFeetPaths.type_1;
                        break;
                    case 'type2':
                        this.legPath = this.constantUtil.tallFeetPaths.type_2;
                        break;
                    case 'type3':
                        this.legPath = this.constantUtil.tallFeetPaths.type_3;
                        break;
                    default:
                        console.error('Type de pieds inconnu pour grande table:', this.constantUtil.formData.legType);
                        break;
                }
                break;
            default:
                console.error('Taille de table inconnue:', this.constantUtil.formData.size);
                break;
        }

        if (this.legPath) {
            this.gltfLoader.load(this.legPath, (legGltf) => {
              this.legMesh = legGltf.scene;

              if(this.constantUtil.formData.size === 'petit'){
                this.legMesh.position.set(0, 0.32, 0)
              } else {
                this.legMesh.scale.set(0.6, 0.6, 0.6);
              };

              this.isLoading = false;
              //Ajout de la table à la scene
              this.scene.add(this.tableMesh);
              this.tableMesh.add(this.legMesh);// Ajouter les pieds à la table
            });
        }
    });
  }

  
  
  private loadShelfModel(): void {
    // Charger le modèle de l'étagère
    const shelfPath = this.constantUtil.tallFlatPaths.type_1; 
    this.gltfLoader.load(shelfPath, (gltf) => {
      this.shelfMesh = gltf.scene;
  
      // Appliquer le scaling
      this.shelfMesh.scale.set(1.5, 1.5, 1.5);
  
      this.scene.add(this.shelfMesh);
    });
  }  

  

  protected onSubmit(): void {
    this.createFurniture();
  }
}
