import { Migration } from '@mikro-orm/migrations';

export class Migration20250427221321 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user_token" alter column "token" type varchar(255) using ("token"::varchar(255));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user_token" alter column "token" type int using ("token"::int);`);
  }

}
