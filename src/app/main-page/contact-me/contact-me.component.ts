import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [TranslateModule,
            FormsModule
  ],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {

  onSubmit() {
    console.log('läuft');
    
  }
  
  scrollToSection(event: MouseEvent, targetId: string) {
    event.preventDefault();  // Verhindert das Neuladen der Seite
  
    // Hier wird die Ziel-ID dynamisch übergeben
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });  // Scrollt sanft zum Ziel
    }
  }
}
