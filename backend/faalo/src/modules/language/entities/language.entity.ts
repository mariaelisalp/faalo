import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { User } from "../../user/entities/user.entity";
import { Vocabulary } from "../../vocabulary/entities/vocabulary.entity";

@Entity()
export class Language{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => User)
    user!: User;
    
    @Property()
    name: string;

    @Property()
    createdAt: Date;

    @OneToMany(() => Vocabulary, vocabulary => vocabulary.language, { cascade: [Cascade.REMOVE] })
      vocabularies= new Collection<Vocabulary>(this);

    constructor(name: string, createdAt: Date){
        this.name = name;
        this.createdAt = createdAt;
    }


}