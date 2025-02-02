import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isPrivacyPage: boolean = false; // Flag, um zu prüfen, ob wir auf der Privacy-Route sind

  constructor(private animationService: AnimationService, private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    // Überwache Router-Ereignisse
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Überprüfen, ob die aktuelle Route die Privacy-Route ist
        this.isPrivacyPage = event.url === '/privacy';
      }
    });
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

}
