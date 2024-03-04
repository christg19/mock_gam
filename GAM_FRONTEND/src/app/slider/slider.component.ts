import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {

  cards = [
    {
      title: 'Card 1',
      content: 'This is the content of card 1.',
      image: 'https://i.stack.imgur.com/rXLSa.png'
    },
    {
      title: 'Card 2',
      content: 'This is the content of card 2.',
      image: 'https://i.stack.imgur.com/rXLSa.png'
    },
 
  ];
}


