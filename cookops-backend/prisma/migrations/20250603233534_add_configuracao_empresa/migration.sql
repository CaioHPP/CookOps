-- CreateTable
CREATE TABLE `ConfiguracaoEmpresa` (
    `id` VARCHAR(191) NOT NULL,
    `empresaId` VARCHAR(191) NOT NULL,
    `horarioAbertura` VARCHAR(191) NOT NULL DEFAULT '08:00',
    `horarioFechamento` VARCHAR(191) NOT NULL DEFAULT '18:00',
    `diasFuncionamento` VARCHAR(191) NOT NULL DEFAULT 'segunda,terca,quarta,quinta,sexta',
    `tempoPreparoMedio` INTEGER NOT NULL DEFAULT 30,
    `notificacaoNovoPedido` BOOLEAN NOT NULL DEFAULT true,
    `notificacaoPedidoPronto` BOOLEAN NOT NULL DEFAULT true,
    `notificacaoSms` BOOLEAN NOT NULL DEFAULT false,
    `emailMarketing` BOOLEAN NOT NULL DEFAULT false,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ConfiguracaoEmpresa_empresaId_key`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConfiguracaoEmpresa` ADD CONSTRAINT `ConfiguracaoEmpresa_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
