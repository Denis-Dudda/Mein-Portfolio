import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';




@Component({
  selector: 'app-my-skill-set',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skill-set.component.html',
  styleUrl: './my-skill-set.component.scss'
})
export class MySkillSetComponent {

  icons = [
    { src: 'assets/icons/Property 1.svg', label: 'Icon 1', property: 'Angular' },
    { src: 'assets/icons/Property 2.svg', label: 'Icon 2', property: 'TypeScript' },
    { src: 'assets/icons/Property 3.svg', label: 'Icon 3', property: 'JavaScript' },
    { src: 'assets/icons/Property 4.svg', label: 'Icon 4', property: 'HTML' },
    { src: 'assets/icons/Property 5.svg', label: 'Icon 5', property: 'CSS' },
    { src: 'assets/icons/Property 6.svg', label: 'Icon 6', property: 'Rest-Api' },
    { src: 'assets/icons/Property 7.svg', label: 'Icon 7', property: 'Firebase' },
    { src: 'assets/icons/Property 8.svg', label: 'Icon 8', property: 'Git' },
    { src: 'assets/icons/Property 9.svg', label: 'Icon 9', property: 'Scrum' },
    { src: 'assets/icons/Property 10.svg', label: 'Icon 10', property: 'Material design' },
    { src: 'assets/icons/Property 11.svg', label: 'Icon 11', property: 'Challenge me' }
  ];
}
