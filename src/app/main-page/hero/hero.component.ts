import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  scrollToSection(event: MouseEvent) {
    event.preventDefault();  // Verhindert das Neuladen der Seite
    
    const target = document.getElementById('why-me');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' }); // Scrollt zum Ziel
    }
  }
}
