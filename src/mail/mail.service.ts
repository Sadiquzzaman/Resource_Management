import { Injectable, BadRequestException } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.email_from,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  public async sendMail(to: string, subject: string, body: string) {
    const mailOptions = {
      from: process.env.email_from,
      to,
      subject,
      text: body,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
