import { IsOptional } from "class-validator";

export class ResourceDto {
    name: string;

    @IsOptional()
    type: string;

    @IsOptional()
    description: string;

    @IsOptional()
    access: string;
}
