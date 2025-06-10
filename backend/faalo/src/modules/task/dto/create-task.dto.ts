import { IsNotEmpty, MaxLength } from "class-validator";

export class TaskDto {

    @IsNotEmpty()
    @MaxLength(500)
    content: string;
}
