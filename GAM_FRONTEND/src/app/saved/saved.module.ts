import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SavedRoutingModule } from './saved-routing.module';
import { CameraModule } from '../camera/camera.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SavedRoutingModule,
    IonicModule,
    CameraModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SavedModule { }
