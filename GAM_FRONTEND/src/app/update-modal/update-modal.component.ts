import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { InsurerService } from '../shared/services/insurers.service';
import { Insurer } from '../shared/interfaces/insurer.interface';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  @Input() insurerId!: string; 

  editForm: FormGroup;
  insurer: Insurer | undefined;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private insurerService: InsurerService,
    private alertController: AlertController
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: [''],
    });
  }

  ngOnInit() {
    this.getInsurerById();
  }

  async getInsurerById() {
    try {
      const insurer = await this.insurerService.getInsurerById(this.insurerId).toPromise();
      if (insurer) {
        this.insurer = insurer;
        this.editForm.patchValue({
          name: insurer.name,
          description: insurer.description,
          logo: insurer.logo,
        });
      } else {
        console.error('Insurer is undefined');
      }
    } catch (error) {
      console.error(error);
      await this.presentAlert('Hubo un error al obtener los datos del asegurador');
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const imageFile = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string; 
        const logoControl = this.editForm.get('logo');
        if (logoControl) {
          logoControl.setValue(base64String);
        }
      };
      reader.readAsDataURL(imageFile); 
    }
  }

  async updateInsurer(insurerId: string) {
    if (this.editForm.valid) {
      try {
        const updatedInsurer: Insurer = {
          _id: insurerId,
          name: this.editForm.get('name')?.value,
          description: this.editForm.get('description')?.value,
          logo: this.editForm.get('logo')?.value,
        };

        const response = await this.insurerService.updateInsurer(insurerId, updatedInsurer);
        console.log(response);

        await this.presentAlert('Aseguradora actualizada con éxito');
        this.editForm.reset();
        this.dismissModal(); 
      } catch (error) {
        console.error(error);
        await this.presentAlert('Hubo un error al actualizar los datos');
      }
    } else {
      await this.presentAlert('Por favor, rellena todos los campos requeridos.');
    }
  }
}
