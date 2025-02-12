import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isPrivacyPage: boolean = false; 
  isLegalPage: boolean = false; 

  constructor(private animationService: AnimationService, private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isPrivacyPage = event.url === '/privacy' || event.url === '/legal';
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

  navigateToHome(): void {
    this.router.navigate(['/']); 
  }

}
