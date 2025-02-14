import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Der Service wird global zur Verfügung gestellt
})
export class AnimationService {
  private observer: IntersectionObserver;

  constructor() {
    // Initialisierung des IntersectionObserver
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wenn das Element im Viewport ist, füge die 'visible' Klasse hinzu
            entry.target.classList.add('visible');
          } else {
            // Wenn das Element den Viewport verlässt, entferne die 'visible' Klasse
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 } // 10% des Elements müssen sichtbar sein, bevor die Animation startet
    );
  }

  // Beobachte ein Element, um die Animation zu starten, wenn es sichtbar wird
  observeElement(element: HTMLElement): void {
    this.observer.observe(element);
  }

  // Stoppe die Beobachtung eines Elements
  unobserveElement(element: HTMLElement): void {
    this.observer.unobserve(element);
  }

  scrollToSection(event: Event, targetId: string, closeBurgerMenuCallback?: () => void): void {
    event.preventDefault();
    const target = document.getElementById(targetId);
  
    if (target) {
      const isMobile = window.innerWidth < 1025; // Prüfen, ob die Ansicht mobil ist
      const offset = 80; // Abstand von 80px nach oben
  
      if (isMobile) {
        // Mobile Ansicht: Vertikales Scrollen mit Offset
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  
        // Burger-Menü schließen, falls eine Callback-Funktion übergeben wurde
        if (closeBurgerMenuCallback) {
          closeBurgerMenuCallback();
        }
      } else {
        // Desktop Ansicht: Horizontales Scrollen mit Offset
        const navWidth = 172; // Breite der Navigation
        target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        window.scrollTo({
          left: target.offsetLeft - navWidth,
          top: window.scrollY - offset, // Optional: Kein vertikaler Offset nötig, falls nur horizontal
          behavior: 'smooth',
        });
      }
    }
  }
}
