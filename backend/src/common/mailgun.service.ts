import { Injectable } from '@nestjs/common';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailgunService {
  private mailgun: any;

  constructor() {
    const mailgun = new Mailgun(formData);
    this.mailgun = mailgun.client({
      username: 'api',
      key: '55b1945ac361f5736d08e78ca2f075da-777a617d-75bd1d21',
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<any> {
    const domain = process.env.MAILGUN_DOMAIN;
    return this.mailgun.messages.create(domain, {
      from: `Excited User <mailgun@${domain}>`,
      to,
      subject,
      text,
    });
  }
}
