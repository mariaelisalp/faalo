import { Injectable } from "@nestjs/common";


@Injectable()
export class EmailService {
    private host: string;

    constructor(){
        this.host = 'faalo@outlook.com.br';
    }

    sendVerificationCode(email: string, token: string){}

    sendPasswordResetLink(email: string, text: string){}
}
