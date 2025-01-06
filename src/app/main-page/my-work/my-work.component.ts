import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [CommonModule,CardComponent,TranslateModule],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  works = [
    {
      projektNumber: '1',
      projektName: 'Join',
      aboutTheProjekt: 'WORK.about_description_project_1',
      technologies: 'WORK.tech-description_project_1',
      description: 'WORK.learned_description_project_1'
    },
    {
      projektNumber: '2',
      projektName: 'El Pollo Loco',
      aboutTheProjekt: 'WORK.about_description_project_2',
      technologies: 'WORK.tech-description_project_2',
      description: 'WORK.learned_description_project_2'
    },    
    {
      projektNumber: '3',
      projektName: 'Da Bubble',
      aboutTheProjekt: 'WORK.about_description_project_3',
      technologies: 'WORK.tech-description_project_3',
      description: 'WORK.learned_description_project_3'
    },
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
