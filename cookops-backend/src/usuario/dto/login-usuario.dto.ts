import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioResponseDto {
  @ApiProperty({ description: 'ID do usuário', example: 'user-1' })
  user: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  nome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Papel do usuário', example: 'ADMIN' })
  role: string;

  @ApiProperty({ description: 'ID da empresa', example: 'empresa-1' })
  empresaId: string;
}
