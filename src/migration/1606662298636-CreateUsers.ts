import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUsers1606662298636 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table(
      {
        name: 'users',
        columns: [
          {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
          {name: 'username', type: 'varchar'},
          {name: 'password_digest', type: 'varchar'}
        ]
      }
    ))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users')
  }

}
