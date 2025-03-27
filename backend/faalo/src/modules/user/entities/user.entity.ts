import { Property, Entity, Unique, PrimaryKey, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { Language } from '../../language/entities/language.entity';

@Entity({tableName: 'users'})
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  profileImage?: string;

  @Property()
  isVerified: boolean;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => Language, language => language.user, { cascade: [Cascade.REMOVE] })
  languages = new Collection<Language>(this);

  constructor(
    name: string,
    email: string,
    password: string,
    profileImage: string,
    isVerified: false,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.profileImage = profileImage;
    this.isVerified = isVerified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}