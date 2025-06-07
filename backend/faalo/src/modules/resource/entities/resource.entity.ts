import { Entity, ManyToOne, PrimaryKey, Property,} from "@mikro-orm/core";
import { Language } from "../../language/entities/language.entity";
import { Topic } from "../../topic/entities/topic.entity";

@Entity()
export class Resource {
    @PrimaryKey()
    id!: number;

    @Property()
    name: string;

    @Property({ nullable: true })
    type?: string;

    @Property({ nullable: true })
    description?: string;

    @Property({ nullable: true })
    access?: string;

    @Property({nullable: true})
    fileName?:string;

    @ManyToOne(() => Language)
    language: Language;

    @ManyToOne(() => Topic, { nullable: true })
    topic: Topic;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(name: string, type: string, description: string, access: string, originalName?: string) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.access = access;
        this.fileName = originalName;
    }
}
