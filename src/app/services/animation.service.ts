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

  // Scrollen zu einer bestimmten Section
  scrollToSection(event: Event, targetId: string) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
      const navWidth = 172;  
      window.scrollTo({
        left: target.offsetLeft - navWidth, 
        behavior: 'smooth'       
      });
    }
  }
}
