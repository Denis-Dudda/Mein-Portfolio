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
  private isMainPage = false;

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
      this.isMainPage = event.url === '/' || event.url === '/main';
    });
  }

  ngOnInit(): void {
    // Überprüfe beim Initialisieren die Fensterbreite
    this.checkWindowWidth();

    // Füge einen EventListener hinzu, um die Fenstergröße bei Änderungen zu überwachen
    window.addEventListener('resize', this.checkWindowWidth.bind(this));

    // EventListener für das scrollen (wheel) hinzufügen mit passive: false
    window.addEventListener('wheel', this.onWheelScroll.bind(this), { passive: false });
  }

  ngAfterViewInit(): void {
    // Sicherstellen, dass keine scroll-bezogenen Anpassungen gemacht werden
  }

  ngOnDestroy(): void {
    // Entferne den EventListener bei der Zerstörung der Komponente
    window.removeEventListener('resize', this.checkWindowWidth.bind(this));
    window.removeEventListener('wheel', this.onWheelScroll.bind(this));
  }

  // Funktion, um die Fenstergröße zu überprüfen und bei Bedarf eine Nachricht auszugeben
  private checkWindowWidth(): void {
    if (window.innerWidth > 800) {
      console.log('Klappen');
    }
  }

  // Funktion, um das horizontale Scrollen zu berechnen und durchzuführen
  private onWheelScroll(event: WheelEvent): void {
    if (window.innerWidth > 800) {
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
