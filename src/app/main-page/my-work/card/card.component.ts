import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export interface Work {
  projektNumber: string;
  projektName: string;
  aboutTheProjekt: string;
  technologies: string;
  description: string;
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
}
