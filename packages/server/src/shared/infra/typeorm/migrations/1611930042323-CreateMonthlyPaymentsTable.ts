import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMonthlyPaymentsTable1611930042323
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'monthly_payments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'title_number',
            type: 'varchar',
          },
          {
            name: 'due_date',
            type: 'timestamp with time zone',
          },

          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['paid', 'pending', 'opened'],
            enumName: 'monthlyStatusEnum',
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
    await queryRunner.dropTable('monthly_payments');
  }
}
