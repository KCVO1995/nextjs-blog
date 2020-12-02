import {MigrationInterface, QueryRunner, TableIndex} from 'typeorm';

export class AddUniqueUsernameToUsers1606923240074 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex('users', new TableIndex({
      name: 'unique_user_username',
      columnNames: ['username'],
      isUnique: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'unique_user_username')
  }

}
