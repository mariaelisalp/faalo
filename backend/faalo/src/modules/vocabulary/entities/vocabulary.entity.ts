import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { Language } from "../../language/entities/language.entity";
import { Word } from "../../word/entities/word.entity";

@Entity()
export class Vocabulary{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Language)
    language: Language;
    
    @Property()
    name: string;

    @Property({nullable: true})
    image: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @OneToMany(() => Word, word => word.vocabulary, { cascade: [Cascade.REMOVE] })
    words = new Collection<Word>(this);

    constructor(name: string, image: string){
        this.name = name;
        this.image = image;
    }


}