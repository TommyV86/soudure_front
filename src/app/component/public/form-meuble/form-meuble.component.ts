import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-form-meuble',
  templateUrl: './form-meuble.component.html',
  styleUrls: ['./form-meuble.component.scss']
})
export class FormMeubleComponent {

  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private tableMesh!: THREE.Group;
  private shelfMesh!: THREE.Group;
  private controls!: OrbitControls;
  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();

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
  protected legTypes = ['type1', 'type2', 'type3', 'type4', 'type5'];


  protected woodTextures = {
    chene : 'assets/image/texture/b1.jpg',
    chataigner : '/assets/image/texture/bois.jpg'
  }

  // protected steelTextures = {
  //   steelOne : 'assets/image/texture/steel.jpeg',
  //   steelTwo : 'assets/image/texture/steel2.png',
  //   steelThree : 'assets/image/texture/steel3.jpg'
  // }

  public constructor() { }

  public ngOnInit(): void { }

  public ngAfterViewInit() {
    this.initThreeJS();
    this.animate();
  }

  private initThreeJS() : void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(312, 420);
    this.renderer.setClearColor(0x000000, 0); // Le second paramètre 0 rend le fond transparent
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.camera.position.z = 10;

    // Ajouter des lumières à la scène
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

  private createFurniture() : void {    
    if (this.tableMesh) {
      this.scene.remove(this.tableMesh);
    }
    if (this.shelfMesh) {
      this.scene.remove(this.shelfMesh);
    }

    // Load the texture based on the selected wood type and leg type
    const texturePath = this.woodTextures[this.formData.woodType as keyof typeof this.woodTextures];
    //const legTexturePath = this.steelTextures[this.formData.legType as keyof typeof this.steelTextures];

    // Load wood texture
    const woodTexturePromise = new Promise<THREE.Texture>((resolve) => {
      this.textureLoader.load(texturePath, resolve);
    });

    // Load leg texture
    const legTexturePromise = new Promise<THREE.Texture>((resolve) => {
      this.textureLoader.load('assets/image/texture/body.jpeg', resolve);
    });
    
    // Wait for both textures to load
    Promise.all([woodTexturePromise, legTexturePromise]).then(([woodTexture, legTexture]) => {
      const woodMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });
      const legMaterial = new THREE.MeshBasicMaterial({ map: legTexture });

      // Create the appropriate furniture based on the selected type
      if (this.formData.furnitureType === 'table') {
        this.createTable(woodMaterial, legMaterial);
      } else if (this.formData.furnitureType === 'etagere') {
        this.createShelf(woodMaterial, legMaterial);
      }
    });
  }

  private createTable(material: THREE.MeshBasicMaterial, legMaterial: THREE.MeshBasicMaterial) : void {
    this.tableMesh = new THREE.Group();

    const dimensions = this.formData.size === 'petit' ? { width: 5, depth: 3, height: 0.5, legHeight: 5, legThickness: 0.5 }
                                                      : { width: 7, depth: 4, height: 0.5, legHeight: 6, legThickness: 0.5 };

    // Table top
    const tableTopGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
    const tableTop = new THREE.Mesh(tableTopGeometry, material);
    tableTop.position.y = dimensions.legHeight;
    this.tableMesh.add(tableTop);

    // Table legs
    const legGeometry = new THREE.BoxGeometry(dimensions.legThickness, dimensions.legHeight, dimensions.legThickness);
    const positions = [
      { x: -dimensions.width / 2 + dimensions.legThickness / 2, y: dimensions.legHeight / 2, z: -dimensions.depth / 2 + dimensions.legThickness / 2 },
      { x: dimensions.width / 2 - dimensions.legThickness / 2, y: dimensions.legHeight / 2, z: -dimensions.depth / 2 + dimensions.legThickness / 2 },
      { x: -dimensions.width / 2 + dimensions.legThickness / 2, y: dimensions.legHeight / 2, z: dimensions.depth / 2 - dimensions.legThickness / 2 },
      { x: dimensions.width / 2 - dimensions.legThickness / 2, y: dimensions.legHeight / 2, z: dimensions.depth / 2 - dimensions.legThickness / 2 }
    ];

    positions.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(pos.x, pos.y, pos.z);
      this.tableMesh.add(leg);
    });

    this.scene.add(this.tableMesh);
  }

  private createShelf(material: THREE.MeshBasicMaterial, legMaterial: THREE.MeshBasicMaterial) : void {
    this.shelfMesh = new THREE.Group();

    const sizes = {
      petit: { width: 3, depth: 1, height: 4 },
      moyen: { width: 4, depth: 1.5, height: 5 },
      grand: { width: 5, depth: 2, height: 6 },
      'tres grand': { width: 6, depth: 2.5, height: 7 },
      gigantesque: { width: 7, depth: 3, height: 8 }
    };

    const dimensions = sizes[this.formData.size as keyof typeof sizes];

    // Shelf
    const shelfGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.depth, dimensions.height);
    const shelf = new THREE.Mesh(shelfGeometry, material);
    shelf.position.y = dimensions.height / 2;
    this.shelfMesh.add(shelf);

    // Adding shelves
    const numberOfShelves = 4;
    for (let i = 1; i <= numberOfShelves; i++) {
      const shelfBoard = new THREE.Mesh(new THREE.BoxGeometry(dimensions.width, 0.1, dimensions.depth), legMaterial);
      shelfBoard.position.y = (i * (dimensions.height / (numberOfShelves + 1)));
      this.shelfMesh.add(shelfBoard);
    }

    this.scene.add(this.shelfMesh);
  }

  private animate() : void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  protected onSubmit() : void {
    this.createFurniture();
  }
}
