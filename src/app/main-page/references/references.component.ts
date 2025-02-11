import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, NgZone, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private animationService: AnimationService,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.refContainer) {
      this.animationService.observeElement(this.refContainer.nativeElement);
    }
    if (this.refWrapper) {
      this.animationService.observeElement(this.refWrapper.nativeElement);
    }
    // Bildschirmgröße wird außerhalb von Angular überwacht, um Fehler zu vermeiden
    this.ngZone.runOutsideAngular(() => {
      this.checkScreenSize();
    });
  }

  @HostListener('window:resize', [])
  onResize(): void {
    // Bildschirmgröße wird außerhalb von Angular überwacht, um Fehler zu vermeiden
    this.ngZone.runOutsideAngular(() => {
      this.checkScreenSize();
    });
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 800;

    // Benachrichtige Angular nach der Änderung der Bildschirmgröße
    this.cdRef.detectChanges();
  }

  selectCard(index: number): void {
    if (index !== this.selectedCardIndex && !this.isFlipping) {
      this.isFlipping = true;
  
      
      setTimeout(() => {
        this.selectedCardIndex = index;
        this.cdRef.detectChanges();
      }, 400); 
  
      
      setTimeout(() => {
        this.isFlipping = false;
        this.cdRef.detectChanges();
      }, 1000);
    }
  }
  

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }
}
