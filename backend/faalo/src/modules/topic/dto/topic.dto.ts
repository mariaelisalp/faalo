import { IsNotEmpty } from "class-validator";

export class TopicDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    moduleType: string;
}
