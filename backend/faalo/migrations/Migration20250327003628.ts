import { Migration } from '@mikro-orm/migrations';

export class Migration20250327003628 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "language" ("id" serial primary key, "user_id" int not null, "name" varchar(255) not null, "created_at" timestamptz not null);`);

    this.addSql(`alter table "language" add constraint "language_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

}
