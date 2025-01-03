import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainPageComponent,
    NavComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'mein-portfolio';
  private scrollLeft = 0; // Aktuelle horizontale Scroll-Position
  private velocity = 0; // Geschwindigkeit für Trägheit
  private damping = 0.85; // Geringe Dämpfung für schnelleres Scrollen
  private scrollFactor = 1.5; // Der Faktor für die Mausradgeschwindigkeit
  private animationFrame: number | null = null; // Für requestAnimationFrame

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      // Scrollen mit Mausrad
      window.addEventListener('wheel', this.handleWheel, { passive: false });

      // Animation starten
      this.startSmoothScroll();
    }
  }

  ngOnDestroy(): void {
    // Event Listener entfernen, um Speicherlecks zu vermeiden
    if (typeof window !== 'undefined') {
      window.removeEventListener('wheel', this.handleWheel);

      // Animation stoppen
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
    }
  }

  // Scrollen mit dem Mausrad
  private handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    // Berechne scrollAmount basierend auf deltaY
    const scrollAmount = event.deltaY * this.scrollFactor;

    // Setze die Geschwindigkeit sofort, ohne Verzögerung
    this.velocity = scrollAmount;

    // Berechne die maximale horizontale Scrollposition
    const maxScrollLeft = document.documentElement.scrollWidth - window.innerWidth;

    // Aktualisiere scrollLeft, wobei wir sicherstellen, dass wir die Grenzen nicht überschreiten
    this.scrollLeft = Math.min(Math.max(0, this.scrollLeft + this.velocity), maxScrollLeft);

    // Scrollen basierend auf der neuen Position
    window.scrollTo({
      left: this.scrollLeft,
      behavior: 'smooth',
    });
  };

  // Smoothes Scrollen mit Trägheitseffekt
  private startSmoothScroll = () => {
    const smoothScroll = () => {
      // Wenn Geschwindigkeit ausreichend hoch ist, scrollen
      if (Math.abs(this.velocity) > 0.2) { // Niedrigere Schwelle, um sofort zu reagieren
        this.scrollLeft += this.velocity;

        // Berechne die maximale horizontale Scrollposition
        const maxScrollLeft = document.documentElement.scrollWidth - window.innerWidth;

        // Beschränke scrollLeft innerhalb der erlaubten Grenzen
        this.scrollLeft = Math.min(Math.max(0, this.scrollLeft), maxScrollLeft);

        window.scrollTo({
          left: this.scrollLeft,
          behavior: 'smooth',
        });

        // Dämpfung anpassen
        this.velocity *= this.damping;
      } else {
        this.velocity = 0; // Stoppe, wenn Geschwindigkeit niedrig genug ist
      }

      // Weiter mit der Animation
      this.animationFrame = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();
  };
}
