import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';




@Component({
  selector: 'app-my-skill-set',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './my-skill-set.component.html',
  styleUrl: './my-skill-set.component.scss'
})
export class MySkillSetComponent implements AfterViewInit{

  @ViewChild('skill') skill!: ElementRef;  // Hier referenzieren wir das Element, das beobachtet werden soll

  icons = [
    { src: './icons/Property 1.svg', label: 'Icon 1', property: 'Angular' },
    { src: './icons/Property 2.svg', label: 'Icon 2', property: 'TypeScript' },
    { src: './icons/Property 3.svg', label: 'Icon 3', property: 'JavaScript' },
    { src: './icons/Property 4.svg', label: 'Icon 4', property: 'HTML' },
    { src: './icons/Property 5.svg', label: 'Icon 5', property: 'CSS' },
    { src: './icons/Property 6.svg', label: 'Icon 6', property: 'Rest-Api' },
    { src: './icons/Property 7.svg', label: 'Icon 7', property: 'Firebase' },
    { src: './icons/Property 8.svg', label: 'Icon 8', property: 'Git' },
    { src: './icons/Property 9.svg', label: 'Icon 9', property: 'Scrum' },
    { src: './icons/Property 10.svg', label: 'Icon 10', property: 'Material design' },
    { src: './icons/Property 11.svg', label: 'Icon 11', property: 'Challenge me' }
  ];

  constructor (private animationService: AnimationService) {
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }

  ngAfterViewInit(): void {
    if (this.skill) {
      this.animationService.observeElement(this.skill.nativeElement); 
    }
  }
}
