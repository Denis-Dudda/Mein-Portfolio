import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RefCardsComponent } from './ref-cards/ref-cards.component';
import { TranslateModule } from '@ngx-translate/core';




@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule,RefCardsComponent,TranslateModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {


  refCards = [
    {
      description:'REF.description_card_1',
      fullName: 'James Rugman',
      projekt: 'Join'
    },
    {
      description:'REF.description_card_2',
      fullName: 'Evelyn Marx',
      projekt: 'Da Bubble'
    },
    {
      description:'REF.description_card_3',
      fullName: 'Noah Mueller',
      projekt: 'El pollo'
    }
  ];

  scrollToSection(event: MouseEvent) {
    event.preventDefault();  // Verhindert das Neuladen der Seite
    
    const target = document.getElementById('references');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' }); // Scrollt zum Ziel
    }
  }
}
