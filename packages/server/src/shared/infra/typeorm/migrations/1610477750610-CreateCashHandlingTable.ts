import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCashHandlingTable1610477750610
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cash_handling',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'bank_value',
            type: 'numeric',
          },
          {
            name: 'return_value',
            type: 'numeric',
          },
          {
            name: 'bank_tariff_value',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cash_handling');
  }
}
