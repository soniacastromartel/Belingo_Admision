import { Injectable } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private emailComposer: EmailComposer) {}

  checkAvailability(
    to: string,
    attachments: string,
    subject: string,
    body: string
  ) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        this.sendMail(to, attachments, subject, body);
      } else {
        console.log('Email Composer not available!');
      }
    });
  }

  sendMail(to: string, attachments: string, subject: string, body: string) {
    const email = {
      to,
      attachments: [attachments],
      subject,
      body,
      isHtml: true,
    };
    this.emailComposer.open(email);
  }


}
