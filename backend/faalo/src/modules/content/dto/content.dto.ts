import { IsOptional, MaxLength } from "class-validator";

export class ContentDto {

    @IsOptional()
    @MaxLength(255)
    title: string;
    
    content: string;
}
