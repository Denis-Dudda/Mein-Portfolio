import { CommonModule } from '@angular/common';
import { Component, Input, HostListener, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export interface Work {
  projektNumber: string;
  projektName: string;
  aboutTheProjekt: string;
  technologies: string;
  description: string;
  githubUrl?: string; 
  liveDemoUrl?: string; 
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() work?: Work;

  isExpanded: boolean = true; // Standardmäßig offen für große Bildschirme

  ngOnInit(): void {
    this.updateCardState(window.innerWidth); // Setze den Anfangszustand basierend auf der Fensterbreite
  }

  // Überwache Änderungen der Fensterbreite
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateCardState(event.target.innerWidth);
  }

  // Methode, die den Zustand der Karte basierend auf der Fensterbreite setzt
  private updateCardState(width: number): void {
    this.isExpanded = width > 800; // Offen bei >800px, geschlossen bei <=800px
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded; // Zustand manuell umschalten
  }

  navigateTo(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
