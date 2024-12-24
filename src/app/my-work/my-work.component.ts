import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [CommonModule,CardComponent],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  works = [
    {
      projektNumber: '1',
      projektName: 'Join',
      aboutTheProjekt: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories. ',
      technologies: 'JavaScript,HTML,CSS,Firebase',
      description: 'OR my group-projects experience'
    },
    {
      projektNumber: '2',
      projektName: 'El Pollo Loco',
      aboutTheProjekt: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      technologies: 'JavaScript,HTML,CSS,Firebase',
      description: 'wurst mit dosenkohl'
    },    
    {
      projektNumber: '3',
      projektName: 'Da Bubble',
      aboutTheProjekt: 'Posuere pretium arcu sed senectus felis ac mauris.  Dui eget dictum.osuere pretium arcu sed senectus felis ac mauris. h',
      technologies: 'Angular,TypeScript,JavaScript,HTML,CSS,Firebase',
      description: 'bla bla bla'
    },
  ];
}
