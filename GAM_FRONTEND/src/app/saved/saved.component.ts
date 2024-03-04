import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { InsurerService } from '../shared/services/insurers.service';
import { AlertController } from '@ionic/angular';
import { Insurer } from '../shared/interfaces/insurer.interface';

register();

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  insurerList: Insurer[] = [];
  public card = [
    { name: "Humano", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: '../../assets/insurers/humano.png' },
    { name: "Aps", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: '../../assets/insurers/aps.png' },
    { name: "Atlantica", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: '../../assets/insurers/atlantica.png' },
  ];

  form!: FormGroup;

  constructor(private insurer: InsurerService, private alertController: AlertController, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['']
    });
  }


  ngOnInit() {
   
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
    this.insurer.getInsurers().subscribe({
      next: (insurers: any) => {
        console.log(insurers)
        this.insurerList = insurers;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onImageSelected(imageUrl: string) {
    const imageControl = this.form.get('image');
    if (imageControl) {
      imageControl.setValue(imageUrl);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.insurer.addInsurer(this.form.value).subscribe({
        next: (response) => {
          console.log(response); 
          this.form.reset();
        },
        error: (error) => {
          console.error(error);
          this.presentAlert('Hubo un error al enviar los datos');
        }
      });
    }
  }
  


}
