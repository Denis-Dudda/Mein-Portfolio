import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
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
  imports: [CommonModule,TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() work?: Work;
  
  navigateTo(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  ngAfterViewInit(): void {
    console.log(this.work);
    
  }
}
