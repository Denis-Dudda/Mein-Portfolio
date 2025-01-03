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
  private velocity = 0; // Geschwindigkeit für Trägheitseffekt
  private damping = 0.9; // Dämpfung der Geschwindigkeit
  private animationFrame: number | null = null; // Für requestAnimationFrame

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      // Horizontales Scrollen mit Mausrad
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
    const scrollAmount = event.deltaY < 0 ? -500 : 500; // Geschwindigkeit
    window.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // Smoothes Scrollen mit Trägheitseffekt
  private startSmoothScroll = () => {
    const smoothScroll = () => {
      if (Math.abs(this.velocity) > 0.5) {
        // Scrollen nur, wenn Geschwindigkeit signifikant ist
        window.scrollBy({
          left: this.velocity,
          behavior: 'auto'
        });

        // Geschwindigkeit dämpfen
        this.velocity *= this.damping;
      } else {
        this.velocity = 0; // Geschwindigkeit auf 0 setzen
      }

      // Animation fortsetzen
      this.animationFrame = requestAnimationFrame(smoothScroll);
    };

    // Starten der Animation
    smoothScroll();
  };
}
