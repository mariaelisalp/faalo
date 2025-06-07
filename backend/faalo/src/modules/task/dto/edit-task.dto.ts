import { IsNotEmpty, Length } from "class-validator";

export class EditTaskDto {
    @IsNotEmpty()
    @Length(500)
    content: string;
    
    isDone: boolean;
}