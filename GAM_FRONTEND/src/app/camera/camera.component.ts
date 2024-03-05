import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @Output() imageSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  async openGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, 
      source: CameraSource.Photos,
    });
    if (image.base64String) {
      this.imageSelected.emit(`data:image/${image.format};base64,${image.base64String}`);
    }
  }
  

}
