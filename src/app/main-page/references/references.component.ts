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
  @ViewChild('cardElement', { static: false }) cardElement!: ElementRef;

  refCards = [
    { description: 'REF.description_card_1', fullName: 'Mehmet Deliaci', projekt: 'Join' },
    { description: 'REF.description_card_2', fullName: 'Andre Veltens', projekt: 'Kochwelt' },
    { description: 'REF.description_card_3', fullName: 'Kai Schulz', projekt: 'Join' }
  ];

  selectedCardIndex = 0;
  isMobile = false;
  isFlipping = false;

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit(): void {
    if (this.refContainer) {
      this.animationService.observeElement(this.refContainer.nativeElement);
    }
    if (this.refWrapper) {
      this.animationService.observeElement(this.refWrapper.nativeElement);
    }
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 800;
  }

  selectCard(index: number): void {
    if (index !== this.selectedCardIndex && !this.isFlipping) {
      this.isFlipping = true;

      // Warten, bis die Karte sich dreht, dann den Index wechseln
      setTimeout(() => {
        this.selectedCardIndex = index;
      }, 250); // Wechsel nach der Hälfte der Animation (0.5s / 2)

      // Warten, bis die Animation fertig ist
      setTimeout(() => {
        this.isFlipping = false;
      }, 500);
    }
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }
}
