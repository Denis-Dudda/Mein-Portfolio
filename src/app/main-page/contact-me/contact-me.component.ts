import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [TranslateModule,
            FormsModule,
            RouterLink,
            CommonModule
  ],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {
  successMessageVisible = false;

  http = inject(HttpClient);

  contactData = {
    name: "",
    email:"",
    message: "",
    policy: false
  }

  mailTest = false;

  post = {
    endPoint: 'https://denis-dudda.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest && this.contactData.policy) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.successMessageVisible = true;         
            ngForm.resetForm();
                      // Erfolgsnachricht nach 3 Sekunden ausblenden
          setTimeout(() => {
            this.successMessageVisible = false;
          }, 3000);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest && this.contactData.policy) {      
      ngForm.resetForm();
    }
  }
  
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
