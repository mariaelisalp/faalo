import { Property, Entity, Unique, PrimaryKey } from '@mikro-orm/core';

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