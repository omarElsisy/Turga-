import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Color } from 'three';
import { EngineService } from './engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css'],
})
export class EngineComponent implements OnInit {
  hafeFaceMak = {
    name: 'hafe_face_maks.glb',
    position: {
      x: 0,
      y: -2,
      z: 0,
    },
    scale: 0.02,
    isSlecte: false,
    color: new Color(0, 0, 0),
    coloredObject: [],
    objectName: [],
    setStartPostion(): void {
      this.position.x = -8;
      this.position.y = 0;
      this.position.z = 0;
      this.scale = 0.01;
    },
    setSleactedPostion(): void {
      this.position.x = 0;
      this.position.z = 0;
      this.position.y = 0;
      this.scale = 0.02;
    },
  };
  turgaMproClear = {
    name: 'Turga_Mpro_clear.gltf.glb',
    position: {
      x: 0,
      y: -2,
      z: 0,
    },
    scale: 0.02,
    isSlecte: false,
    color: new Color(0, 0, 0),
    coloredObject: [],
    objectName: ['adult_v7', 'adult_v7_1'],
    setStartPostion(): void {
      this.position.x = 0;
      this.position.y = 0;
      this.position.z = 0;
      this.scale = 0.02;
    },
    setSleactedPostion(): void {
      this.position.x = 8;
      this.position.z = 5;
      this.position.y = 0;
      this.scale = 0.005;
    },
  };
  turgeMpro = {
    name: 'TurgaMpro.glb',
    position: {
      x: 0,
      y: -2,
      z: 0,
    },
    scale: 0.02,
    isSlecte: true,
    color: new Color(0, 0, 0),
    coloredObject: [],
    objectName: ['adult_v7_1', 'adult_v7_2'],
    setStartPostion(): void {
      this.position.x = 0;
      this.position.y = 0;
      this.position.z = 0;
      this.scale = 0.01;
    },
    setSleactedPostion(): void {
      this.position.x = 0;
      this.position.z = 5;
      this.position.y = 0;
      this.scale = 0.015;
    },
  };
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: EngineService) {}

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.loadModel(this.turgeMpro);
    this.engServ.loadModel(this.turgaMproClear);
    this.engServ.loadModel(this.hafeFaceMak);
    this.engServ.animate(this.turgeMpro, this.turgaMproClear, this.hafeFaceMak);
    console.log(this.hafeFaceMak);
  }
  onClinckTurgaMproClear(): void {
    this.turgaMproClear.isSlecte = true;
    this.turgeMpro.isSlecte = false;
    this.hafeFaceMak.isSlecte = false;

  }
  onClinckTurgaMpro(): void {
    this.turgeMpro.isSlecte = true;
    this.turgaMproClear.isSlecte = false;
    this.hafeFaceMak.isSlecte = false;

  }
  onClinckHafeFace(): void {
    this.hafeFaceMak.isSlecte = true;
    this.turgaMproClear.isSlecte = false;
    this.turgeMpro.isSlecte = false;

  }
  blue(): void{
    this.turgaMproClear.color = new Color('blue');
    this.turgeMpro.color = new Color('blue');

  }
  black(): void{
    this.turgaMproClear.color = new Color('black');
    this.turgeMpro.color = new Color('black');

  }
  read(): void{
    this.turgaMproClear.color = new Color('red');
    this.turgeMpro.color = new Color('red');

  }
  wigth(): void{
    this.turgaMproClear.color = new Color(0xffffff);
    this.turgeMpro.color = new Color(0xffffff);

  }
  pink(): void{
    this.turgaMproClear.color = new Color('pink');
    this.turgeMpro.color = new Color('pink');
  }
}
