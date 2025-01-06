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

  scrollToSection(event: MouseEvent, targetId: string) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
      const navWidth = 172;  
      window.scrollTo({
        left: target.offsetLeft - navWidth, 
        behavior: 'smooth'       
      });
    }
  }
}
