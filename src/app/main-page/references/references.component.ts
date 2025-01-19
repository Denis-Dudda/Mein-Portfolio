import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefCardsComponent } from './ref-cards/ref-cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, RefCardsComponent, TranslateModule],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements AfterViewInit {
  @ViewChild('refContainer') refContainer!: ElementRef;
  @ViewChild('refWrapper') refWrapper!: ElementRef;

  refCards = [
    {
      description: 'REF.description_card_1',
      fullName: 'Mehmet Deliaci',
      projekt: 'Join'
    },
    {
      description: 'REF.description_card_2',
      fullName: 'Evelyn Marx',
      projekt: 'Da Bubble'
    },
    {
      description: 'REF.description_card_3',
      fullName: 'Noah Mueller',
      projekt: 'El pollo'
    }
  ];

  selectedCardIndex = 0; // Index der aktuell sichtbaren Karte
  isMobile = false; // Anzeige, ob es sich um eine mobile Ansicht handelt

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit(): void {
    if (this.refContainer) {
      this.animationService.observeElement(this.refContainer.nativeElement);
    }
    if (this.refWrapper) {
      this.animationService.observeElement(this.refWrapper.nativeElement);
    }

    this.checkScreenSize(); // Initiale Prüfung
  }

  @HostListener('window:resize', []) // Event-Listener für Fenstergröße
  onResize(): void {
    this.checkScreenSize();
  }

  // Prüfen, ob die mobile Ansicht aktiv ist
  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 800;
  }

  // Karte auswählen
  selectCard(index: number): void {
    this.selectedCardIndex = index;
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }
}
