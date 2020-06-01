import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

/**
 *  onDelete: 'RESTRICT' = NÃO DEIXA O REGISTRO USUARIO SER DELETADO
 *  onDelete: 'set null' = Se segunda tabela da chave estrangeira
 * for deletada, seta o campo na tabela pai como null
 * onDelete: 'cascade' = deletou o registro da segunda tabela da chave
 * estrangeira, deleta também o registro da tabela pai
 *
 * onUpdate: Se o id da tabela filho for alterado, o que acontece com o
 * id na tabela pai
 */
export default class AlterProviderFieldToProviderId1590935070996
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'], // nome da coluna na tabela de usuario que vai representar o provider_id
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  /**
   * Como se trata de alteração, preciso alterar ao inverso
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'aapointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
