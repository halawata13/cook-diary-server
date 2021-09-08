import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1616075877235 implements MigrationInterface {
    name = 'CreateTable1616075877235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `dishes` (`id` bigint NOT NULL AUTO_INCREMENT, `user_id` bigint NOT NULL, `recipe_id` bigint NOT NULL, `date` date NOT NULL, `url` varchar(255) NULL, `type` tinyint NULL, `order` int NOT NULL DEFAULT '0', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX `IDX_5555864e6b74cebc0c7b1ae2f6` (`date`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `recipes` (`id` bigint NOT NULL AUTO_INCREMENT, `user_id` bigint NOT NULL, `name` varchar(255) NOT NULL, `kana` varchar(255) NOT NULL, `rate` int NULL, `kind` tinyint NULL, `memo` text NOT NULL DEFAULT '', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diaries` (`id` bigint NOT NULL AUTO_INCREMENT, `user_id` bigint NOT NULL, `date` date NOT NULL, `memo` text NOT NULL DEFAULT '', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX `IDX_c117a79dce09de0ef13c6aca90` (`date`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `dishes` ADD CONSTRAINT `FK_234aed37a149815a68ae8c2aa32` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `dishes` ADD CONSTRAINT `FK_8638b34ba06f7be8c11dbf4a5d5` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `recipes` ADD CONSTRAINT `FK_67d98fd6ff56c4340a811402154` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diaries` ADD CONSTRAINT `FK_648dd552daded36f58a30ca0932` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `diaries` DROP FOREIGN KEY `FK_648dd552daded36f58a30ca0932`");
        await queryRunner.query("ALTER TABLE `recipes` DROP FOREIGN KEY `FK_67d98fd6ff56c4340a811402154`");
        await queryRunner.query("ALTER TABLE `dishes` DROP FOREIGN KEY `FK_8638b34ba06f7be8c11dbf4a5d5`");
        await queryRunner.query("ALTER TABLE `dishes` DROP FOREIGN KEY `FK_234aed37a149815a68ae8c2aa32`");
        await queryRunner.query("DROP INDEX `IDX_c117a79dce09de0ef13c6aca90` ON `diaries`");
        await queryRunner.query("DROP TABLE `diaries`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `recipes`");
        await queryRunner.query("DROP INDEX `IDX_5555864e6b74cebc0c7b1ae2f6` ON `dishes`");
        await queryRunner.query("DROP TABLE `dishes`");
    }

}
