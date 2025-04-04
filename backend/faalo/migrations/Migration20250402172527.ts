import { Migration } from '@mikro-orm/migrations';

export class Migration20250402172527 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "word" ("id" serial primary key, "vocabulary_id" int not null, "word" varchar(255) not null, "translation" varchar(255) null, "definition" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`alter table "word" add constraint "word_vocabulary_id_foreign" foreign key ("vocabulary_id") references "vocabulary" ("id") on update cascade;`);

    this.addSql(`alter table "language" add column "updated_at" timestamptz not null;`);
    this.addSql(`alter table "language" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);

    this.addSql(`alter table "vocabulary" add column "image" varchar(255) null, add column "updated_at" timestamptz not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "language" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
  }

}
