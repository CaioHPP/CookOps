/*
  Warnings:

  - You are about to alter the column `planoId` on the `Assinatura` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `planoAtualId` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `FontePedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `FontePedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `FormaPagamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `FormaPagamento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `deStatusId` on the `LogMovimentacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `paraStatusId` on the `LogMovimentacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `statusId` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `fonteId` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `pagamentoId` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `PedidoStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PedidoStatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Plano` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Plano` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `empresaId` to the `FormaPagamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Assinatura` DROP FOREIGN KEY `Assinatura_planoId_fkey`;

-- DropForeignKey
ALTER TABLE `Empresa` DROP FOREIGN KEY `Empresa_planoAtualId_fkey`;

-- DropForeignKey
ALTER TABLE `LogMovimentacao` DROP FOREIGN KEY `LogMovimentacao_deStatusId_fkey`;

-- DropForeignKey
ALTER TABLE `LogMovimentacao` DROP FOREIGN KEY `LogMovimentacao_paraStatusId_fkey`;

-- DropForeignKey
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_fonteId_fkey`;

-- DropForeignKey
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_pagamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_statusId_fkey`;

-- DropIndex
DROP INDEX `Assinatura_planoId_fkey` ON `Assinatura`;

-- DropIndex
DROP INDEX `Empresa_planoAtualId_fkey` ON `Empresa`;

-- DropIndex
DROP INDEX `LogMovimentacao_deStatusId_fkey` ON `LogMovimentacao`;

-- DropIndex
DROP INDEX `LogMovimentacao_paraStatusId_fkey` ON `LogMovimentacao`;

-- DropIndex
DROP INDEX `Pedido_fonteId_fkey` ON `Pedido`;

-- DropIndex
DROP INDEX `Pedido_pagamentoId_fkey` ON `Pedido`;

-- DropIndex
DROP INDEX `Pedido_statusId_fkey` ON `Pedido`;

-- AlterTable
ALTER TABLE `Assinatura` MODIFY `planoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Empresa` MODIFY `planoAtualId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FontePedido` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `FormaPagamento` DROP PRIMARY KEY,
    ADD COLUMN `empresaId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `LogMovimentacao` MODIFY `deStatusId` INTEGER NULL,
    MODIFY `paraStatusId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Pedido` MODIFY `statusId` INTEGER NOT NULL,
    MODIFY `fonteId` INTEGER NOT NULL,
    MODIFY `pagamentoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PedidoStatus` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Plano` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_planoAtualId_fkey` FOREIGN KEY (`planoAtualId`) REFERENCES `Plano`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assinatura` ADD CONSTRAINT `Assinatura_planoId_fkey` FOREIGN KEY (`planoId`) REFERENCES `Plano`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `PedidoStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_pagamentoId_fkey` FOREIGN KEY (`pagamentoId`) REFERENCES `FormaPagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_fonteId_fkey` FOREIGN KEY (`fonteId`) REFERENCES `FontePedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormaPagamento` ADD CONSTRAINT `FormaPagamento_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogMovimentacao` ADD CONSTRAINT `LogMovimentacao_deStatusId_fkey` FOREIGN KEY (`deStatusId`) REFERENCES `PedidoStatus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogMovimentacao` ADD CONSTRAINT `LogMovimentacao_paraStatusId_fkey` FOREIGN KEY (`paraStatusId`) REFERENCES `PedidoStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
