import { Injectable } from '@nestjs/common';
import { SendgridClient } from './sendgrid-client/sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class EmailService {
    constructor(private sendGridClient: SendgridClient){}

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

    async sendVerificationCode(recipient: string, token: number){
        const mail: MailDataRequired = {
            to: recipient,
            from: "faalo@outlook.com.br",
            subject: "Faalo - email verification",
            content: [{type: 'text/plain', value: token.toString()}],
        };

        await this.sendGridClient.send(mail);
    }
}
