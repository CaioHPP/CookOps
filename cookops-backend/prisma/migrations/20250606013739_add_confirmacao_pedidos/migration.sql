-- AlterTable
ALTER TABLE `FontePedido` ADD COLUMN `confirmaAutomatico` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `exigeConfirmacao` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tempoLimiteConfirma` INTEGER NULL;

-- AlterTable
ALTER TABLE `Pedido` ADD COLUMN `confirmaAutomatico` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `confirmado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `dataConfirmacao` DATETIME(3) NULL,
    ADD COLUMN `usuarioConfirmou` VARCHAR(191) NULL;
