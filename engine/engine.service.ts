import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Color, Group } from 'three';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  public constructor(private ngZone: NgZone) {
    this.models = new Array();
    this.all = true;
  }
  private canvas!: HTMLCanvasElement;
  private all: boolean;
  // tslint:disable-next-line: ban-types
  private models: any;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;
  private loader!: GLTFLoader;
  private Mask!: Group;
  private frameId!: number;
  private hight = 600;
  private controls!: OrbitControls;
  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }
  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;
    this.hight = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.setSize(window.innerWidth, this.hight);
    // create the scene
    this.scene = new THREE.Scene();
    this.scene.background = new Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth) / this.hight,
      0.1,
      1000
    );
    this.camera.position.z = 10;
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.lookAt(0, 0, 0);
    console.log(this.camera);
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 5;
    this.scene.add(this.light);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  public loadModel(Model: any): void {
    this.loader = new GLTFLoader();
    this.loader.load('../assets/3d_model/' + Model.name, (gltf) => {
      this.Mask = gltf.scene;
      this.Mask.visible = false;
      this.Mask.scale.set(Model.scale, Model.scale, Model.scale);
      this.Mask.position.set(
        Model.position.x,
        Model.position.y,
        Model.position.z
      );
      this.Mask.rotation.x = 0;
      this.Mask.rotation.y = 0;
      this.scene.add(this.Mask);
      Model.scene = this.Mask;
      let i = 0;
      for (const objectName of Model.objectName) {
        Model.coloredObject[i] = gltf.scene.getObjectByName(objectName);
        i++;
      }
    });
  }
  private dumpObject(
    obj: any,
    lines: string[] = [],
    isLast = true,
    prefix = ''
  ): string[] {
    let localPrefix = '';
    localPrefix = isLast ? '└─' : '├─';
    lines.push(
      `${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${
        obj.type
      }]`
    );
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child: any, ndx: number) => {
      isLast = ndx === lastNdx;
      this.dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
  }

  public animate(turgeMpro: any, turgaMproClear: any, hafeFaceMak: any): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render(turgeMpro, turgaMproClear, hafeFaceMak);
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render(turgeMpro, turgaMproClear, hafeFaceMak);
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(turgeMpro: any, turgaMproClear: any, hafeFaceMak: any): void {
    this.frameId = requestAnimationFrame(() => {
      this.render(turgeMpro, turgaMproClear, hafeFaceMak);
    });
    if (
      turgeMpro.scene !== undefined &&
      turgaMproClear.scene !== undefined &&
      hafeFaceMak.scene !== undefined
    ) {
      if (turgaMproClear.isSlecte) {
        turgaMproClear.scene.visible = true;
        hafeFaceMak.scene.visible = false;
        turgeMpro.scene.visible = false;
      } else if (turgeMpro.isSlecte) {
        turgaMproClear.scene.visible = false;
        hafeFaceMak.scene.visible = false;
        turgeMpro.scene.visible = true;
      } else if (hafeFaceMak.isSlecte) {
        turgaMproClear.scene.visible = false;
        turgeMpro.scene.visible = false;
        hafeFaceMak.scene.visible = true;
      }
      this.changeColor(turgeMpro, turgeMpro.color);
      this.changeColor(turgaMproClear, turgeMpro.color);
    }
    this.renderer.render(this.scene, this.camera);
  }
  private translitoin(model: any): void {
    if (model.position.z - model.scene.position.z > 0.04) {
      model.scene.position.z += 0.06;
    } else if (model.position.z - model.scene.position.z < -0.04) {
      model.scene.position.z -= 0.06;
    }
    if (model.scale - model.scene.scale.x > 0.001) {
      model.scene.scale.x += 0.005;
      model.scene.scale.y += 0.005;
      model.scene.scale.z += 0.005;
    } else if (model.scale - model.scene.scale.x < -0.001) {
      model.scene.scale.x -= 0.005;
      model.scene.scale.y -= 0.005;
      model.scene.scale.z -= 0.005;
    }
  }
  private traslitionCame(position: number): void {
    if (position - this.camera.position.x > 0.1) {
      this.camera.position.x += 0.1;
    } else if (position - this.camera.position.x < -0.1) {
      this.camera.position.x -= 0.1;
    }
  }
  public creatModelScane(): void {}

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
  public changeColor(Model: any, color: Color): void {
    for (const objectColor of Model.coloredObject) {
      objectColor.material.color = color;
    }
  }
  setHight(): void {
    this.hight = window.innerHeight;
  }
  public renderModel(Model: any): void {
    this.frameId = requestAnimationFrame(() => {
      this.renderModel(Model);
    });
    this.changeColor(Model, Model.color);
    this.renderer.render(this.scene, this.camera);
  }
  
}
