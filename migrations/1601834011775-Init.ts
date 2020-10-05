import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1601834011775 implements MigrationInterface {
    name = 'Init1601834011775';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "user_gender_enum" AS ENUM(\'0\', \'1\')');
        await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "full_name" character varying(100) NOT NULL, "dob" date NOT NULL, "gender" "user_gender_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user"');
        await queryRunner.query('DROP TYPE "user_gender_enum"');
    }

}
