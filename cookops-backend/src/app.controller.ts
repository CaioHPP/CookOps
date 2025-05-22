import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AssinaturaService } from './assinatura/assinatura.service';
import { BoardService } from './board/board.service';
import { EmpresaService } from './empresa/empresa.service';
import { FontePedidoService } from './fontepedido/fontepedido.service';
import { FormaPagamentoService } from './formapagamento/formapagamento.service';
import { LogMovimentacaoService } from './logmovimentacao/logmovimentacao.service';
import { PedidoService } from './pedido/pedido.service';
import { PedidoStatusService } from './pedidostatus/pedidostatus.service';
import { PlanoService } from './plano/plano.service';
import { UsuarioService } from './usuario/usuario.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pedidoService: PedidoService,
    private readonly empresaService: EmpresaService,
    private readonly usuarioService: UsuarioService,
    private readonly planoService: PlanoService,
    private readonly boardService: BoardService,
    private readonly fontePedidoService: FontePedidoService,
    private readonly formaPagamentoService: FormaPagamentoService,
    private readonly logMovimentacaoService: LogMovimentacaoService,
    private readonly pedidoStatusService: PedidoStatusService,
    private readonly assinaturaService: AssinaturaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pedidos')
  async getPedidos() {
    return this.pedidoService.findAll();
  }

  @Get('empresas')
  async getEmpresas() {
    return this.empresaService.findAll();
  }

  @Get('usuarios')
  async getUsuarios() {
    return this.usuarioService.findAll();
  }

  @Get('planos')
  async getPlanos() {
    return this.planoService.findAll();
  }

  @Get('boards')
  async getBoards() {
    return this.boardService.findAll();
  }

  @Get('fontepedidos')
  async getFontePedidos() {
    return this.fontePedidoService.findAll();
  }

  @Get('formapagamentos')
  async getFormaPagamentos() {
    return this.formaPagamentoService.findAll();
  }

  @Get('logmovimentacoes')
  async getLogMovimentacoes() {
    return this.logMovimentacaoService.findAll();
  }

  @Get('pedidostatus')
  async getPedidoStatus() {
    return this.pedidoStatusService.findAll();
  }

  @Get('assinaturas')
  async getAssinaturas() {
    return this.assinaturaService.findAll();
  }
}
