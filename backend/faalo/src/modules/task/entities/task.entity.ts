import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Language } from "../../language/entities/language.entity";

@Entity()
export class Task {
    @PrimaryKey()
    id!: number;

    @Property({type: 'string', length: 500})
    content: string;

    @Property({default: false})
    isDone: boolean;

    @ManyToOne(() => Language)
    language: Language;

    constructor(content: string){
        this.content = content;
    }
}
