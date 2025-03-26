import { IsNotEmpty, Length } from "class-validator";

export class PasswordEditDto{
    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @Length(8)
    newPassword: string;
}