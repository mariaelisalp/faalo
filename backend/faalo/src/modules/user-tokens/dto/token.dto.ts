import { IsNotEmpty, IsNumber } from "class-validator";

export class TokenDto{

    @IsNotEmpty()
    value: number;
}