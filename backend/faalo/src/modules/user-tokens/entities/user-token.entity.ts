import { Property, Entity, Unique, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class UserToken {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  email: string;

  @Property()
  token: number;

  @Property()
  type: string;

  @Property()
  expiresIn: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(
    email: string,
    token: number,
    type: string,
    createdAt: Date,
    expiresIn: number
  ) {
    this.email = email;
    this.token = token;
    this.type = type;
    this.createdAt = createdAt;
    this.expiresIn = expiresIn;
  }
}