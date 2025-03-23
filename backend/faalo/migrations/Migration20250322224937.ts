import { Migration } from '@mikro-orm/migrations';

export class Migration20250322224937 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "profile_image" varchar(255) null, "is_verified" boolean not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "user_token" ("id" serial primary key, "email" varchar(255) not null, "token" int not null, "type" varchar(255) not null, "expires_in" int not null, "created_at" varchar(255) not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "user_token" add constraint "user_token_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "profile_image" varchar(255) null, "is_verified" boolean not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

}
