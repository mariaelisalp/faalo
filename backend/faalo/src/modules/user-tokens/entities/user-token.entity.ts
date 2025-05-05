import { Property, Entity, Unique, PrimaryKey } from '@mikro-orm/core';
import { TokenType } from 'src/enums/token-types.enum';

@Entity()
export class UserToken {
  @PrimaryKey()
  id!: number;

  @Property()
  email: string;

  @Property()
  token: string;

  @Property()
  type: TokenType;

  @Property()
  expiresIn: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(
    email: string,
    token: string,
    type: TokenType,
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