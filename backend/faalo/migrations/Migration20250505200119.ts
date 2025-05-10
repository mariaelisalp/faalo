import { Migration } from '@mikro-orm/migrations';

export class Migration20250505200119 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user_token" drop constraint "user_token_email_unique";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user_token" add constraint "user_token_email_unique" unique ("email");`);
  }

}
