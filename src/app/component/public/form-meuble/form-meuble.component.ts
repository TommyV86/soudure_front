import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

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

  // Form data
  protected formData = {
    furnitureType: 'table',
    woodType: 'chene',
    size: 'petit',
    legType: 'type1'
  };

  protected sizesTable = ['petit', 'grand'];
  protected sizesShelf = ['petit', 'moyen', 'grand', 'tres grand', 'gigantesque'];
  protected woodTypes = ['chene', 'chataigner'];
  protected legTypes = ['type1', 'type2', 'type3', 'type4', 'type5'];

  public constructor() { }

  public ngOnInit(): void { }

  public ngAfterViewInit() {
    this.initThreeJS();
    this.animate();
  }

  private initThreeJS() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(312, 420);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.camera.position.z = 10;
  }

  private createFurniture() {
    if (this.tableMesh) {
      this.scene.remove(this.tableMesh);
    }
    if (this.shelfMesh) {
      this.scene.remove(this.shelfMesh);
    }

    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Default to brown wood color

    if (this.formData.furnitureType === 'table') {
      this.createTable(material);
    } else if (this.formData.furnitureType === 'etagere') {
      this.createShelf(material);
    }
  }

  private createTable(material: THREE.MeshBasicMaterial) {
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
      const leg = new THREE.Mesh(legGeometry, material);
      leg.position.set(pos.x, pos.y, pos.z);
      this.tableMesh.add(leg);
    });

    this.scene.add(this.tableMesh);
  }

  private createShelf(material: THREE.MeshBasicMaterial) {
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
      const shelfBoard = new THREE.Mesh(new THREE.BoxGeometry(dimensions.width, 0.1, dimensions.depth), material);
      shelfBoard.position.y = (i * (dimensions.height / (numberOfShelves + 1)));
      this.shelfMesh.add(shelfBoard);
    }

    this.scene.add(this.shelfMesh);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  protected onSubmit() {
    this.createFurniture();
  }
}
