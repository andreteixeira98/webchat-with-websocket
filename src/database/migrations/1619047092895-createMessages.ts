
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createMessages1619047092895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "messages",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'admin_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',

                    },
                    {
                        name: 'text',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }

}
