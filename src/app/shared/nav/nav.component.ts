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
    event.preventDefault();  // Verhindert das Neuladen der Seite
  
    // Hier wird die Ziel-ID dynamisch übergeben
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });  // Scrollt sanft zum Ziel
    }
  }
}
