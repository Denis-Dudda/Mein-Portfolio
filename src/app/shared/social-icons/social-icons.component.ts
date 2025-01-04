import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-social-icons',
  standalone: true,
  imports: [],
  templateUrl: './social-icons.component.html',
  styleUrl: './social-icons.component.scss'
})
export class SocialIconsComponent {

  constructor(private translate: TranslateService) { }

  switchLanguage(language: string) {
    this.translate.use(language);  
  }
}
