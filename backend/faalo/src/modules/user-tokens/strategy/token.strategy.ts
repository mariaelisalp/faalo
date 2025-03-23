export interface TokenStrategy{
    generateEmailToken(email: string);
    sendEmail(email: string, token: number);

}