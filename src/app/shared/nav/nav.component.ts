import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent { 
  constructor (private animationService: AnimationService,private translate: TranslateService) {
  }

  burgerMenuOpen = false;

  toggleBurgerMenu(): void {
    this.burgerMenuOpen = !this.burgerMenuOpen;    
  }

  scroll(event: MouseEvent, targetId: string): void {
    
    event.preventDefault();
    
    this.animationService.scrollToSection(event, targetId);
    this.burgerMenuOpen = false; // Schließt das Burger-Menü
  }

  switchLanguage(language: string) {
    this.translate.use(language);  
  }
  
}
