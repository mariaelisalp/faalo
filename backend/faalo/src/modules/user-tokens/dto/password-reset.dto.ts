import { IsNotEmpty, Length } from "class-validator";

export class PassworResetDto {

    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @Length(8)
    confirmPassword: string;
}