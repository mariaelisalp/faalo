import { IsNotEmpty, IsNumber } from "class-validator";

export class TokenDto{

    @IsNumber()
    @IsNotEmpty()
    token: number;
}