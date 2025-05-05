import { IsEmail, IsNotEmpty } from "class-validator";

export class PasswordResetEmailDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;
}