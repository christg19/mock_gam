import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { InsurerService } from '../shared/services/insurers.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Insurer } from '../shared/interfaces/insurer.interface';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

register();

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {
  insurer!: Insurer

  insurerList: Insurer[] = [];
  public card = [
    { name: "Humano", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: '../../assets/insurers/humano.png' },
    { name: "Aps", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: '../../assets/insurers/aps.png' },
    { name: "Atlantica", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: '../../assets/insurers/atlantica.png' },
  ];

  form!: FormGroup;

  constructor(private insurerService: InsurerService, private alertController: AlertController, private formBuilder: FormBuilder, private modalController: ModalController) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.getAllInsurers();
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getAllInsurers() {
    this.insurerService.getInsurers().subscribe({
      next: (insurers: any) => {
        console.log(insurers)
        this.insurerList = insurers;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  async editInsurer(insurer: Insurer) {
    const modal = await this.modalController.create({
      component: UpdateModalComponent,
      componentProps: {

        insurer: insurer._id,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

  }

  onImageSelected(imageBase64: string) {
    const logoControl = this.form.get('logo');
    if (logoControl) {
      logoControl.setValue(imageBase64);
    }
  }

  async updateInsurer(insurerId: string) {
    if (this.form.valid) {
      try {
        const updatedInsurer: Insurer = {
          _id: insurerId,
          name: this.form.get('name')?.value,
          description: this.form.get('description')?.value,
          logo: this.form.get('logo')?.value,

        };

        const response = await this.insurerService.updateInsurer(insurerId, updatedInsurer);
        console.log(response);

        await this.presentAlert('Aseguradora actualizada con éxito');
        this.form.reset();
      } catch (error) {
        console.error(error);
        await this.presentAlert('Hubo un error al actualizar los datos');
      }
    } else {
      await this.presentAlert('Por favor, rellena todos los campos requeridos.');
    }
  }

  async deleteInsurer(insurerId: string | undefined) {
    if (insurerId) {
      try {
        const response = await this.insurerService.deleteInsurer(insurerId);

        window.location.reload();

      } catch (error) {
        console.error(error);
        await this.presentAlert('Hubo un error al eliminar los datos');
      }
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const logoControl = this.form.get('logo');
  
        if (!logoControl || !logoControl.value) {
          await this.presentAlert('Debes subir una imagen');
          return;
        }
  
        await this.insurerService.addInsurer(this.form.value);
  
        window.location.reload();
      } catch (error) {
        console.error(error);
        this.presentAlert('Hubo un error al enviar los datos');
      }
    }
  }
  
}
