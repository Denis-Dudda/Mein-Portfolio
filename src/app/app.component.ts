import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from "@ngx-translate/core";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainPageComponent,
    NavComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  title = 'mein-portfolio';
  private isMainPage = false; // Speichert, ob wir uns auf der Hauptseite befinden
  private lastScrollTime = 0;  // Zeitstempel des letzten Scrollens
  private maxScrollSpeed = 800;  // Maximale horizontale Scroll-Geschwindigkeit (in px/s)

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    // Überwache Routenwechsel
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Überprüfe, ob die aktuelle Route die Hauptseite ist
      this.isMainPage = event.url === '/' || event.url === '/main';
    });
  }

  ngOnInit(): void {
    // EventListener für das Scrollen (wheel) hinzufügen mit passive: false
    window.addEventListener('wheel', this.onWheelScroll.bind(this), { passive: false });
  }

  ngAfterViewInit(): void {
    // Sicherstellen, dass keine scroll-bezogenen Anpassungen gemacht werden
  }

  ngOnDestroy(): void {
    // Entferne den EventListener bei der Zerstörung der Komponente
    window.removeEventListener('wheel', this.onWheelScroll.bind(this));
  }

  // Funktion, um das horizontale Scrollen nur auf der Hauptseite zu aktivieren
  private onWheelScroll(event: WheelEvent): void {
    // Falls wir uns NICHT auf der Hauptseite befinden, normales Scrollen erlauben
    if (!this.isMainPage) {
      return;
    }

    if (window.innerWidth > 1024) {
      // Verhindert das Standardverhalten (vertikales Scrollen)
      event.preventDefault();

      // Berechne die horizontale Scroll-Entfernung basierend auf dem deltaY-Wert
      const scrollSpeedFactor = 3;  // Standardmäßige Scrollgeschwindigkeit in Pixeln pro deltaY-Einheit
      const horizontalScroll = event.deltaY * scrollSpeedFactor;

      // Berechne die Zeit, die zum Scrollen dieser Entfernung benötigt wird
      const scrollTime = Math.abs(horizontalScroll) / this.maxScrollSpeed * 500;  // Zeit in Millisekunden

      // Berechne den aktuellen Zeitpunkt
      const now = Date.now();

      // Wenn die Zeit seit dem letzten Scrollen länger als die benötigte Zeit ist, dann scrollen
      if (now - this.lastScrollTime > scrollTime) {
        // Führe das Scrollen durch
        window.scrollBy({
          left: horizontalScroll,  // Scrollt horizontal mit der berechneten Geschwindigkeit
          behavior: 'smooth'        // Optional: für ein sanftes Scrollen
        });

        // Speichere die Zeit des letzten Scrollens
        this.lastScrollTime = now;
      }
    }
  }
}
