import { Component } from '@angular/core';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { ReferencesComponent } from './references/references.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { MySkillSetComponent } from './my-skill-set/my-skill-set.component';
import { WhyMeComponent } from './why-me/why-me.component';
import { SocialIconsComponent } from '../shared/social-icons/social-icons.component';
import { NavComponent } from '../shared/nav/nav.component';
import { HeroComponent } from './hero/hero.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
      CommonModule,
      HeroComponent,
      SocialIconsComponent,
      WhyMeComponent,
      MySkillSetComponent,
      MyWorkComponent,
      ReferencesComponent,
      ContactMeComponent
    ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
