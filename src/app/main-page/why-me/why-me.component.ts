import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './why-me.component.html',
  styleUrls: ['./why-me.component.scss']
})
export class WhyMeComponent implements AfterViewInit {

  @ViewChild('whyMeSection') whyMeSection!: ElementRef;  // Hier referenzieren wir das Element, das beobachtet werden soll

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit(): void {
    if (this.whyMeSection) {
      this.animationService.observeElement(this.whyMeSection.nativeElement);
    }
  }

  scroll(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    this.animationService.scrollToSection(event, targetId);
  }
}
