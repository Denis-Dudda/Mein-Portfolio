import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from "@ngx-translate/core";

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

  private lastScrollTime = 0; // Der Zeitpunkt des letzten Scroll-Ereignisses
  private scrollThrottleDelay = 200; // Verzögerung in Millisekunden, um schnelle Scroll-Ereignisse zu drosseln
  private scrollLeft = 0; // Aktuelle horizontale Scroll-Position
  private velocity = 0; // Geschwindigkeit für Trägheit
  private damping = 0.85; // Geringe Dämpfung für schnelleres Scrollen
  private scrollFactor = 5; // Der Faktor für die Scroll-Geschwindigkeit (je höher, desto schneller)
  private animationFrame: number | null = null; // Für requestAnimationFrame

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      // Scroll-Position beim Laden der Seite wiederherstellen
      const savedScrollPosition = localStorage.getItem('scrollLeft');
      if (savedScrollPosition) {
        window.scrollTo({
          left: parseInt(savedScrollPosition, 10),
          behavior: 'auto', // Sofortiges Setzen der Position, kein sanftes Scrollen
        });
      }

      // Scrollen mit Mausrad
      window.addEventListener('wheel', this.handleWheel, { passive: false });
    }
  }

  ngOnDestroy(): void {
    // Event Listener entfernen, um Speicherlecks zu vermeiden
    if (typeof window !== 'undefined') {
      window.removeEventListener('wheel', this.handleWheel);
    }
  }

  // Scrollen mit dem Mausrad
  private handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    // Den aktuellen Zeitpunkt ermitteln
    const now = Date.now();

    // Wenn der Zeitpunkt mehr als scrollThrottleDelay ms seit dem letzten Scroll-Ereignis vergangen ist
    if (now - this.lastScrollTime > this.scrollThrottleDelay) {
      this.lastScrollTime = now; // Zeitpunkt des letzten Scroll-Ereignisses speichern

      // Berechne den Scrollwert basierend auf deltaY und dem scrollFactor
      const scrollAmount = event.deltaY * this.scrollFactor;

      // Berechne die neue horizontale Scroll-Position
      const newScrollLeft = window.scrollX + scrollAmount;

      // Speichern der neuen Scroll-Position im localStorage
      localStorage.setItem('scrollLeft', newScrollLeft.toString());

      // Setze die neue Scroll-Position mit sanftem Verhalten
      window.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth', // Sanftes Scrollen
      });
    }
  };
}
