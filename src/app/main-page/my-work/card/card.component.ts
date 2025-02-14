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
  img?: string; 
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

  isExpanded: boolean = true; 

  ngOnInit(): void {
    this.updateCardState(window.innerWidth); 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateCardState(event.target.innerWidth);
  }
 
  private updateCardState(width: number): void {
    this.isExpanded = width > 1025;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded; 
  }

  navigateTo(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
