import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsPreviousBalanceColumnOnCashHandlingTable1610555562090
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cash_handling',
      new TableColumn({
        name: 'is_previous_balance',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cash_handling', 'is_previous_balance');
  }
}
