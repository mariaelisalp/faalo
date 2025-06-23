import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

@Injectable()
export class EmailService {

    private resend;

    constructor(private config: ConfigService){
        this.resend = new Resend(this.config.get('RESEND_API_KEY'));
        console.log(this.resend, 'chave resend')
    }

    sendVerificationCode(email: string, token: string){

        return this.resend.emails.send({
            from: this.config.get('EMAIL_DOMAIN'),
            to: email,
            subject: 'Faalo - Email verification',
            html: token
        });
    }

    sendPasswordResetLink(email: string, text: string){
        return this.resend.emails.send({
            from: this.config.get('EMAIL_DOMAIN'),
            to: email,
            subject: 'Faalo - Reset Password',
            text: text
        });
    }
}
