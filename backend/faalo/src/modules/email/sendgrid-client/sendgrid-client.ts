import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridClient {
    private logger: Logger;

    constructor(private config: ConfigService){
        this.logger = new Logger(SendgridClient.name);
        const key = this.config.get('SENDGRID_API_KEY');
        SendGrid.setApiKey(key);
    }

    async send(mail: SendGrid.MailDataRequired){
        try{
            await SendGrid.send(mail);
            this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
        }
        catch(e){
            throw new Error("Error while sending email.");
        }
    }
}