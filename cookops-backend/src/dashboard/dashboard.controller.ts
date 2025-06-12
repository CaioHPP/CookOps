import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard.dto';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  @ApiOperation({
    summary: 'Obter dados completos do dashboard',
    description: 'Retorna todas as métricas e KPIs para o dashboard da empresa',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por status específico dos pedidos',
    example: 'todos',
  })
  @ApiQuery({
    name: 'fonte',
    required: false,
    description: 'Filtrar por fonte específica dos pedidos',
    example: 'todas',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do dashboard obtidos com sucesso',
    type: DashboardResponseDto,
  })
  async getDashboard(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
    @Query('status') status?: string,
    @Query('fonte') fonte?: string,
  ): Promise<DashboardResponseDto> {
    const empresaId = req.user.empresaId;
    const filters = {
      periodo: periodo || '30',
      status: status || 'todos',
      fonte: fonte || 'todas',
    };
    return this.dashboardService.getDashboardDataWithFilters(
      empresaId,
      filters,
    );
  }

  @Get('vendas')
  @ApiOperation({
    summary: 'Obter métricas de vendas',
    description: 'Retorna apenas as métricas relacionadas a vendas',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  async getMetricasVendas(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
  ) {
    const empresaId = req.user.empresaId;
    const dashboard = await this.dashboardService.getDashboardData(
      empresaId,
      periodo,
    );
    return {
      vendas: dashboard.vendas,
      periodo: dashboard.periodo,
      ultimaAtualizacao: dashboard.ultimaAtualizacao,
    };
  }

  @Get('performance')
  @ApiOperation({
    summary: 'Obter métricas de performance',
    description: 'Retorna apenas as métricas de performance operacional',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  async getMetricasPerformance(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
  ) {
    const empresaId = req.user.empresaId;
    const dashboard = await this.dashboardService.getDashboardData(
      empresaId,
      periodo,
    );
    return {
      performance: dashboard.performance,
      periodo: dashboard.periodo,
      ultimaAtualizacao: dashboard.ultimaAtualizacao,
    };
  }

  @Get('produtos')
  @ApiOperation({
    summary: 'Obter métricas de produtos',
    description: 'Retorna análises detalhadas dos produtos',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  async getMetricasProdutos(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
  ) {
    const empresaId = req.user.empresaId;
    const dashboard = await this.dashboardService.getDashboardData(
      empresaId,
      periodo,
    );
    return {
      produtos: dashboard.produtos,
      periodo: dashboard.periodo,
      ultimaAtualizacao: dashboard.ultimaAtualizacao,
    };
  }

  @Get('crescimento')
  @ApiOperation({
    summary: 'Obter métricas de crescimento',
    description: 'Retorna análises de crescimento e tendências',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  async getMetricasCrescimento(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
  ) {
    const empresaId = req.user.empresaId;
    const dashboard = await this.dashboardService.getDashboardData(
      empresaId,
      periodo,
    );
    return {
      crescimento: dashboard.crescimento,
      periodo: dashboard.periodo,
      ultimaAtualizacao: dashboard.ultimaAtualizacao,
    };
  }

  @Get('financeiro')
  @ApiOperation({
    summary: 'Obter métricas financeiras',
    description: 'Retorna análises financeiras detalhadas',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  async getMetricasFinanceiras(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
  ) {
    const empresaId = req.user.empresaId;
    const dashboard = await this.dashboardService.getDashboardData(
      empresaId,
      periodo,
    );
    return {
      financeiro: dashboard.financeiro,
      periodo: dashboard.periodo,
      ultimaAtualizacao: dashboard.ultimaAtualizacao,
    };
  }

  @Get('operacional')
  @ApiOperation({
    summary: 'Obter métricas operacionais',
    description: 'Retorna análises operacionais do negócio',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  async getMetricasOperacionais(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
  ) {
    const empresaId = req.user.empresaId;
    const dashboard = await this.dashboardService.getDashboardData(
      empresaId,
      periodo,
    );
    return {
      operacional: dashboard.operacional,
      periodo: dashboard.periodo,
      ultimaAtualizacao: dashboard.ultimaAtualizacao,
    };
  }

  @Get('comparativo')
  @ApiOperation({
    summary: 'Obter dados comparativos do dashboard',
    description: 'Retorna métricas atuais vs período anterior para comparação',
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período em dias para análise (padrão: 30)',
    example: '30',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por status específico dos pedidos',
    example: 'todos',
  })
  @ApiQuery({
    name: 'fonte',
    required: false,
    description: 'Filtrar por fonte específica dos pedidos',
    example: 'todas',
  })
  async getDashboardComparativo(
    @Request() req: { user: { empresaId: string } },
    @Query('periodo') periodo?: string,
    @Query('status') status?: string,
    @Query('fonte') fonte?: string,
  ) {
    const empresaId = req.user.empresaId;
    const filters = {
      periodo: periodo || '30',
      status: status || 'todos',
      fonte: fonte || 'todas',
    };
    return this.dashboardService.getDashboardComparativo(empresaId, filters);
  }
}
