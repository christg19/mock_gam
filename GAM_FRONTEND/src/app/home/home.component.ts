import { Component, OnInit } from '@angular/core';
import { InsurerService } from '../shared/services/insurers.service';
import { Insurer } from '../shared/interfaces/insurer.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public insurerList:Insurer[] = [];

  public insurerListTest = [
    { logo: '../../assets/insurers/colonial.png' },
    { logo: '../../assets/insurers/atlantica.png' },
    { logo: '../../assets/insurers/aps.png' },
    { logo: '../../assets/insurers/futuro.png' },
    { logo: '../../assets/insurers/humano.png' },
    { logo: '../../assets/insurers/patria.png' },

  ];

  constructor(private insurerService:InsurerService) { }

  ngOnInit(){
    this.getAllInsurer();
  }

  getAllInsurer(){
    this.insurerService.getInsurers().subscribe({
      next: (insurers:any) => {
        this.insurerList = insurers;
      }
    })
  }

}
