import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ConfiguracaoEmpresaService } from './configuracao-empresa.service';
import { CreateConfiguracaoEmpresaDto } from './dto/create-configuracao-empresa.dto';
import { UpdateConfiguracaoEmpresaDto } from './dto/update-configuracao-empresa.dto';

@Controller('configuracao-empresa')
@UseGuards(JwtAuthGuard)
export class ConfiguracaoEmpresaController {
  constructor(
    private readonly configuracaoEmpresaService: ConfiguracaoEmpresaService,
  ) {}

  @Post()
  create(@Body() createConfiguracaoEmpresaDto: CreateConfiguracaoEmpresaDto) {
    return this.configuracaoEmpresaService.create(createConfiguracaoEmpresaDto);
  }

  @Get()
  findByEmpresa(@Request() req) {
    const empresaId = req.user.empresaId;
    return this.configuracaoEmpresaService.findByEmpresaIdOrCreate(empresaId);
  }

  @Get(':empresaId')
  findByEmpresaId(@Param('empresaId') empresaId: string) {
    return this.configuracaoEmpresaService.findByEmpresaId(empresaId);
  }

  @Patch()
  update(
    @Request() req,
    @Body() updateConfiguracaoEmpresaDto: UpdateConfiguracaoEmpresaDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.configuracaoEmpresaService.upsert(
      empresaId,
      updateConfiguracaoEmpresaDto,
    );
  }

  @Patch(':empresaId')
  updateByEmpresaId(
    @Param('empresaId') empresaId: string,
    @Body() updateConfiguracaoEmpresaDto: UpdateConfiguracaoEmpresaDto,
  ) {
    return this.configuracaoEmpresaService.update(
      empresaId,
      updateConfiguracaoEmpresaDto,
    );
  }

  @Delete(':empresaId')
  remove(@Param('empresaId') empresaId: string) {
    return this.configuracaoEmpresaService.remove(empresaId);
  }
}
