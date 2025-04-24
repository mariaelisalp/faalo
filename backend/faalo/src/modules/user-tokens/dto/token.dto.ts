import { IsNotEmpty, IsNumber } from "class-validator";

export class TokenDto{

    @IsNotEmpty()
    token: number;
}