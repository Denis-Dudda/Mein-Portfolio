import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent { 
  scrollToSection(event: MouseEvent, targetId: string) {
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
