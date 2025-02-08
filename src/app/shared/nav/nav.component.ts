import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  burgerMenuOpen = false;
  isPrivacyPage: boolean = false; // Flag, um zu prüfen, ob wir auf der Privacy-Route sind
  isLegalPage: boolean = false; // Flag, um zu prüfen, ob wir auf der Privacy-Route sind

  constructor(private animationService: AnimationService, private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    // Überwache Router-Ereignisse
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Überprüfen, ob die aktuelle Route die Privacy-Route ist
        this.isPrivacyPage = event.url === '/privacy' || event.url === '/legal';
      }
    });
  }

  toggleBurgerMenu(): void {
    this.burgerMenuOpen = !this.burgerMenuOpen;
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
    this.burgerMenuOpen = false; // Schließt das Burger-Menü
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
