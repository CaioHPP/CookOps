-- AlterTable
ALTER TABLE `Empresa` ADD COLUMN `enderecoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
