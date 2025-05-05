import { Injectable } from '@nestjs/common';
import { SendgridClient } from './sendgrid-client/sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class EmailService {
    private host: string;

    constructor(private sendGridClient: SendgridClient){
        this.host = 'faalo@outlook.com.br';
    }

    async sendTestEmail(recipient: string, body = 'This is an email!'){
        const mail: MailDataRequired = {
            to: recipient,
            from: 'faalo@outlook.com.br', 
            subject: 'Test email',
            content: [{ type: 'text/plain', value: body }],
        };
        await this.sendGridClient.send(mail);
    }

    /*async sendEmailWithTemplate(recipient: string, body: string){
        const mail: MailDataRequired = {
            to: recipient,
            cc: 'example@mail.com', //Assuming you want to send a copy to this email
            from: 'faalo@outlook.com.br', 
            templateId: process.env.SENDGRID_TEMPLATE_ID, 
            dynamicTemplateData: { body, subject: 'Send Email with template' }, 
          };
          await this.sendGridClient.send(mail);
    }*/

    async sendVerificationCode(recipient: string, token: string){
        const mail: MailDataRequired = {
            to: recipient,
            from: this.host,
            subject: "Faalo - email verification",
            content: [{type: 'text/plain', value: token}],
        };

        await this.sendGridClient.send(mail);
    }

    async sendPasswordResetLink(recipient: string, text: string){
        const mail: MailDataRequired = {
            to: recipient,
            from: this.host,
            subject: "Faalo - Password Reset",
            content: [{type: 'text/plain', value: text}]
        }

        await this.sendGridClient.send(mail);
    }
}
