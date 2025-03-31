import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Language } from "../../language/entities/language.entity";

@Entity()
export class Text {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Language)
    language: Language;
    
    @Property()
    title: string;

    @Property()
    content: string

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(title: string, content: string){
        this.title = title;
        this.content = content;
    }
}
