import { IsOptional } from "class-validator";

export class ContentDto {

    @IsOptional()
    title: string;
    content: string;
}
