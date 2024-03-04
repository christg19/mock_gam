import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  insurerList = [
    { logo: '../../assets/insurers/colonial.png' },
    { logo: '../../assets/insurers/atlantica.png' },
    { logo: '../../assets/insurers/aps.png' },
    { logo: '../../assets/insurers/futuro.png' },
    { logo: '../../assets/insurers/humano.png' },
    { logo: '../../assets/insurers/patria.png' },

  ];

  
  constructor() { }

  ngOnInit() { }

}
