import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './shared/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainPageComponent,
    NavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'mein-portfolio';
  private isMouseDown = false; // Maus gedrückt?
  private startX = 0; // Mausstartposition X
  private scrollLeft = 0; // Startposition des Scrollens
  private velocity = 0; // Geschwindigkeit für Trägheitseffekt
  private damping = 0.9; // Dämpfung der Geschwindigkeit
  private animationFrame: number | null = null; // Für requestAnimationFrame

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      // Horizontales Scrollen mit Mausrad
      window.addEventListener('wheel', this.handleWheel, { passive: false });

      // Maus-Ziehen für horizontales Scrollen
      window.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mouseleave', this.onMouseUp);

      // Animation starten
      this.startSmoothScroll();
    }
  }

  ngOnDestroy(): void {
    // Event Listener entfernen, um Speicherlecks zu vermeiden
    if (typeof window !== 'undefined') {
      window.removeEventListener('wheel', this.handleWheel);
      window.removeEventListener('mousedown', this.onMouseDown);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mouseleave', this.onMouseUp);

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

  // Maus drücken
  private onMouseDown = (event: MouseEvent) => {
    this.isMouseDown = true;
    this.startX = event.pageX; // Startposition der Maus speichern
    this.scrollLeft = window.scrollX; // Aktuelle Scrollposition speichern
    this.velocity = 0; // Geschwindigkeit zurücksetzen

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  // Maus bewegen
  private onMouseMove = (event: MouseEvent) => {
    if (!this.isMouseDown) return;

    const distance = this.startX - event.pageX; // Distanz berechnen
    this.velocity = distance; // Geschwindigkeit anpassen
  };

  // Maus loslassen
  private onMouseUp = () => {
    this.isMouseDown = false;

    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
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
