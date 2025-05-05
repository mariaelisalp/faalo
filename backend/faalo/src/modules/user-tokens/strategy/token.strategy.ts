export interface TokenStrategy{
    generateEmailToken(email: string);
    sendEmail(email: string, token: string, text?:string);

}