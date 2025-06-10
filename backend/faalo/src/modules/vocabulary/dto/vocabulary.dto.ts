import { IsNotEmpty, IsOptional } from "class-validator";

export class VocabularyDto{

    @IsNotEmpty()
    name: string;
}