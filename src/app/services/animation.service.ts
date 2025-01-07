import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Der Service wird global zur Verfügung gestellt
})

export class AnimationService {
    text = true;

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