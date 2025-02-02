import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from "@ngx-translate/core";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainPageComponent,
    NavComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'mein-portfolio';
  private lastScrollTime = 0;
  private scrollThrottleDelay = 200;
  private scrollFactor = 8;
  private isMainPage = false;

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    // Überwache Routenwechsel
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isMainPage = event.url === '/' || event.url === '/main';
      this.updateScrollBehavior();
      this.updateBodyOverflow(); // Body overflow je nach Route anpassen
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const savedScrollPosition = localStorage.getItem('scrollLeft');
      if (savedScrollPosition) {
        window.scrollTo({ left: parseInt(savedScrollPosition, 10), behavior: 'auto' });
      }
      this.updateScrollBehavior();
      this.updateBodyOverflow(); // Sicherstellen, dass overflow beim ersten Laden korrekt gesetzt ist
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('wheel', this.handleWheel);
    }
  }

  private updateScrollBehavior(): void {
    if (typeof window === 'undefined') return;

    window.removeEventListener('wheel', this.handleWheel);

    if (this.isMainPage) {
      window.addEventListener('wheel', this.handleWheel, { passive: false });
    }
  }

  private updateBodyOverflow(): void {
    // Wenn wir auf der MainPage sind, horizontal scrollen erlauben
    if (this.isMainPage) {
      document.body.style.overflowX = 'auto';
      document.body.style.overflowY = 'hidden'; // Vertikal deaktivieren
    } else {
      document.body.style.overflowX = 'hidden'; // Horizontal deaktivieren
      document.body.style.overflowY = 'auto';  // Vertikal aktivieren
    }
  }

  private handleWheel = (event: WheelEvent) => {
    if (!this.isMainPage) return;

    event.preventDefault();
    const isSmallScreen = window.innerWidth < 801;
    const now = Date.now();

    if (now - this.lastScrollTime > this.scrollThrottleDelay) {
      this.lastScrollTime = now;
      const scrollAmount = event.deltaY * this.scrollFactor;

      if (isSmallScreen) {
        window.scrollTo({ top: window.scrollY + scrollAmount, behavior: 'smooth' });
      } else {
        const newScrollLeft = window.scrollX + scrollAmount;
        localStorage.setItem('scrollLeft', newScrollLeft.toString());
        window.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      }
    }
  };
}
