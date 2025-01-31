import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

    constructor (private animationService: AnimationService,private translate: TranslateService) {
    }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
    
  }

  switchLanguage(language: string) {
    this.translate.use(language);  
  }

}
