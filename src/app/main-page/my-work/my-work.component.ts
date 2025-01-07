import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';

interface Work {
  projektNumber: string;
  projektName: string;
  aboutTheProjekt: string;
  technologies: string;
  description: string;
  githubUrl: string;
  liveDemoUrl: string;
}

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
      description: 'WORK.learned_description_project_1',
      githubUrl: 'https://github.com/Denis-Dudda/join',
      liveDemoUrl: 'https://denis-dudda.developerakademie.net/join/index.html'
    },
    {
      projektNumber: '2',
      projektName: 'El Pollo Loco',
      aboutTheProjekt: 'WORK.about_description_project_2',
      technologies: 'WORK.tech-description_project_2',
      description: 'WORK.learned_description_project_2',
      githubUrl: 'https://github.com/Denis-Dudda/El-Pollo-Loco',
      liveDemoUrl: 'https://denis-dudda.developerakademie.net/el-pollo/index.html'
    },    
    {
      projektNumber: '3',
      projektName: 'Da Bubble',
      aboutTheProjekt: 'WORK.about_description_project_3',
      technologies: 'WORK.tech-description_project_3',
      description: 'WORK.learned_description_project_3',
      githubUrl: 'https://github.com/Denis-Dudda/Pokedex-2.0',
      liveDemoUrl: 'https://denis-dudda.developerakademie.net/Pokedex%202.0/index.html'
    },
  ];

  constructor (private animationService: AnimationService) {
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }
}
