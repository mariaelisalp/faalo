import { IsNotEmpty, IsOptional } from "class-validator";

export class TextDto {

    @IsOptional()
    title: string;

    content: string;
}
