import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RefCardsComponent } from './ref-cards/ref-cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';




@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule,RefCardsComponent,TranslateModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent implements AfterViewInit{

  @ViewChild('refContainer') refContainer!: ElementRef;
  @ViewChild('refWrapper') refWrapper!: ElementRef;

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

  constructor (private animationService: AnimationService) {
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }

  ngAfterViewInit(): void {
    if (this.refContainer) {
      this.animationService.observeElement(this.refContainer.nativeElement); 
    }
    if (this.refWrapper) {
      this.animationService.observeElement(this.refWrapper.nativeElement); 
    }
  }


}
