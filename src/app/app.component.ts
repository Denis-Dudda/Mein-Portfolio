import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { MainPageComponent } from './main-page/main-page.component';

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
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      // Horizontales Scrollen mit Mausrad
      window.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();

        window.scrollBy({
          left: event.deltaY < 0 ? -500 : 500,
          behavior: 'smooth'
        });
      }, { passive: false });

      // Maus-Ziehen für horizontales Scrollen
      let isMouseDown = false;
      let startX = 0; // Startposition der Maus
      let scrollLeft = 0; // Ausgangspunkt des Scrollens
      let velocity = 0; // Geschwindigkeit des Scrollens
      const speedFactor = 1.0; // Geschwindigkeitsskalierung
      const damping = 0.9; // Dämpfungsfaktor (0.9 = sanfte Trägheit)

      const onMouseDown = (e: MouseEvent) => {
        isMouseDown = true;
        startX = e.pageX; // Mausposition merken
        scrollLeft = window.scrollX;

        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        velocity = 0; // Geschwindigkeit zurücksetzen
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isMouseDown) return;

        const distance = (e.pageX - startX) * speedFactor;
        velocity = -distance; // Geschwindigkeit berechnen (negativ für Scrollrichtung)
      };

      const onMouseUp = () => {
        isMouseDown = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = '';
      };

      const smoothScroll = () => {
        if (Math.abs(velocity) > 0.5) { // Nur scrollen, wenn die Geschwindigkeit signifikant ist
          window.scrollBy({
            left: velocity,
            behavior: 'auto'
          });

          velocity *= damping; // Geschwindigkeit langsam dämpfen
        } else {
          velocity = 0; // Geschwindigkeit auf 0 setzen, wenn kaum Bewegung ist
        }

        requestAnimationFrame(smoothScroll); // Animation weiterführen
      };

      // Animation starten
      smoothScroll();

      // Event Listener hinzufügen
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mouseleave', onMouseUp);
    }
  }
}
