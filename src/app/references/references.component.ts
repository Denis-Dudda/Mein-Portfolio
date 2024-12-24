import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RefCardsComponent } from './ref-cards/ref-cards.component';



@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule,RefCardsComponent],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {


  refCards = [
    {
      description:'Michael is a reliable and friendly person. Work in a structured way and write a clear code. I recommend him as a colleague.',
      fullName: 'James Rugman',
      projekt: 'Join'
    },
    {
      description:' He is a trustworthy teamplayer and can cope with the stress of deadlines. Structured work and clear code. ',
      fullName: 'Evelyn Marx',
      projekt: 'Da Bubble'
    },
    {
      description:'Michael had to develop, format and deliver content in collaboration with the team members.He is a reliable and friendly person.',
      fullName: 'Noah Mueller',
      projekt: 'El pollo'
    }
  ];
  ngOnInit(){
    console.log(this.refCards); // Überprüfe die Daten im Parent
  }
}
