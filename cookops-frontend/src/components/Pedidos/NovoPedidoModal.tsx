"use client";

import { BoardService } from "@/api/services/board.service";
import { EmpresaService } from "@/api/services/empresa.service";
import { FontePedidoService } from "@/api/services/fontepedido.service";
import { FormaPagamentoService } from "@/api/services/formapagamento.service";
import { PedidoService } from "@/api/services/pedido.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { FontePedidoResponseDto } from "@/types/dto/fontepedido/response/fontepedido-response.dto";
import { FormaPagamentoResponseDto } from "@/types/dto/formapagamento/response/formapagamento-response.dto";
import { PedidoRequestAddDto } from "@/types/dto/pedido/request/pedido-request.dto";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { Check, Package } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { EnderecoStep } from "./steps/EnderecoStep";
import { FinalizarPedidoStep } from "./steps/FinalizarPedidoStep";
import { SelecaoItensStep } from "./steps/SelecaoItensStep";

// Tipo para criação de pedido (sem pedidoId nos itens)
type CreatePedidoData = Omit<PedidoRequestAddDto, "itens"> & {
  itens: Array<{
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    observacao?: string;
  }>;
};

interface NovoPedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPedidoCriado: () => void;
}

export interface PedidoItem {
  produto: ProdutoResponseDto;
  quantidade: number;
  observacao?: string;
}

export interface PedidoFormData {
  fonteId: number | null;
  pagamentoId: number | null;
  isEntrega: boolean;
  desconto: number;
  taxaEntrega: number;
  observacao: string;
  itens: PedidoItem[];
  endereco?: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep?: string;
    referencia?: string;
  };
}

const STORAGE_KEY = "selected_board_pedidos";

const steps = [
  { key: "selecao", label: "Seleção de Itens", icon: Package },
  { key: "endereco", label: "Endereço", icon: Package },
  { key: "finalizacao", label: "Finalização", icon: Check },
];

export function NovoPedidoModal({
  isOpen,
  onClose,
  onPedidoCriado,
}: NovoPedidoModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [boards, setBoards] = useState<BoardResponseDto[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [fontesPedido, setFontesPedido] = useState<FontePedidoResponseDto[]>(
    []
  );
  const [formasPagamento, setFormasPagamento] = useState<
    FormaPagamentoResponseDto[]
  >([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [formData, setFormData] = useState<PedidoFormData>({
    fonteId: null,
    pagamentoId: null,
    isEntrega: false,
    desconto: 0,
    taxaEntrega: 0,
    observacao: "",
    itens: [],
  });

  // Carregar dados iniciais
  useEffect(() => {
    if (isOpen) {
      loadInitialData();
      loadSelectedBoard();
      loadEmpresaData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const loadSelectedBoard = () => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedBoard(saved);
      }
    }
  };

  // Carregar dados da empresa para pré-preencher endereço
  const loadEmpresaData = useCallback(async () => {
    try {
      const empresaData = await EmpresaService.getEmpresaCompletaByAuth();
      // Pré-preencher cidade e UF da empresa no endereço do pedido
      if (empresaData.endereco?.cidade || empresaData.endereco?.uf) {
        setFormData((prev) => ({
          ...prev,
          endereco: {
            rua: prev.endereco?.rua || "",
            numero: prev.endereco?.numero || "",
            complemento: prev.endereco?.complemento || "",
            bairro: prev.endereco?.bairro || "",
            cidade: empresaData.endereco?.cidade || prev.endereco?.cidade || "",
            uf: empresaData.endereco?.uf || prev.endereco?.uf || "",
            cep: prev.endereco?.cep || "",
            referencia: prev.endereco?.referencia || "",
          },
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar dados da empresa:", error);
      // Não exibir toast de erro aqui para não poluir a interface
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [boardsData, fontesData, formasData] = await Promise.all([
        BoardService.getBoardsByEmpresa(),
        FontePedidoService.getFontesPagamento(),
        FormaPagamentoService.getFormasPagamentoByEmpresa(),
      ]);

      setBoards(Array.isArray(boardsData) ? boardsData : []);
      setFontesPedido(fontesData);
      setFormasPagamento(formasData.filter((f) => f.ativo));

      // Se não há board selecionado, seleciona o primeiro disponível
      if (!selectedBoard && boardsData.length > 0) {
        const firstBoard = boardsData[0].id;
        setSelectedBoard(firstBoard);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(STORAGE_KEY, firstBoard);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
      toast.error("Erro ao carregar dados iniciais");
    } finally {
      setIsLoading(false);
    }
  }, [selectedBoard]);

  const resetForm = () => {
    setCurrentStep(0);
    setValidationErrors({});
    setFormData({
      fonteId: null,
      pagamentoId: null,
      isEntrega: false,
      desconto: 0,
      taxaEntrega: 0,
      observacao: "",
      itens: [],
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const updateFormData = useCallback((updates: Partial<PedidoFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Limpar erros de validação quando dados são atualizados
    setValidationErrors({});
  }, []);

  const handleNext = () => {
    // Validação simples por step
    if (currentStep === 0) {
      if (
        !formData.fonteId ||
        !formData.pagamentoId ||
        formData.itens.length === 0
      ) {
        toast.error(
          "Por favor, selecione a fonte, forma de pagamento e adicione pelo menos um item."
        );
        return;
      }
    }

    // Se não é entrega, pula a etapa de endereço
    if (currentStep === 0 && !formData.isEntrega) {
      setCurrentStep(2);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    // Se não é entrega e está na finalização, volta para seleção
    if (currentStep === 2 && !formData.isEntrega) {
      setCurrentStep(0);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 0: // Seleção de Itens
        return (
          formData.fonteId && formData.pagamentoId && formData.itens.length > 0
        );
      case 1: // Endereço
        return (
          formData.endereco &&
          formData.endereco.rua &&
          formData.endereco.numero &&
          formData.endereco.bairro
        );
      case 2: // Finalização
        return true;
      default:
        return false;
    }
  };

  const calculateTotal = () => {
    const subtotal = formData.itens.reduce(
      (acc, item) => acc + item.produto.precoBase * item.quantidade,
      0
    );
    return subtotal + formData.taxaEntrega - formData.desconto;
  };

  const handleSubmit = async () => {
    if (!selectedBoard) {
      toast.error("Selecione um board antes de criar o pedido");
      return;
    }

    // Validação básica dos dados obrigatórios
    if (
      !formData.fonteId ||
      !formData.pagamentoId ||
      formData.itens.length === 0
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (
      formData.isEntrega &&
      (!formData.endereco?.rua ||
        !formData.endereco?.numero ||
        !formData.endereco?.bairro)
    ) {
      toast.error(
        "Por favor, preencha todos os campos obrigatórios do endereço"
      );
      return;
    }

    try {
      setIsLoading(true);

      const pedidoData: CreatePedidoData = {
        boardId: selectedBoard,
        fonteId: formData.fonteId!,
        pagamentoId: formData.pagamentoId!,
        desconto: formData.desconto,
        taxaEntrega: formData.taxaEntrega,
        valorTotal: calculateTotal(),
        observacao: formData.observacao || undefined,
        endereco: formData.isEntrega ? formData.endereco : undefined,
        itens: formData.itens.map((item) => ({
          produtoId: item.produto.id,
          quantidade: item.quantidade,
          precoUnitario: item.produto.precoBase,
          observacao: item.observacao,
        })),
      };

      // O backend irá adicionar o pedidoId nos itens automaticamente
      await PedidoService.addPedido(
        pedidoData as unknown as PedidoRequestAddDto
      );
      toast.success("Pedido criado com sucesso!");
      onPedidoCriado();
      handleClose();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      toast.error("Erro ao criar pedido. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getVisibleSteps = () => {
    if (!formData.isEntrega) {
      return steps.filter((step) => step.key !== "endereco");
    }
    return steps;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Novo Pedido
          </DialogTitle>
        </DialogHeader>
        {/* Indicador de progresso */}
        <div className="flex items-center justify-center space-x-4 py-4 border-b">
          {getVisibleSteps().map((step, index) => {
            const StepIcon = step.icon;
            const isActive =
              index ===
              (formData.isEntrega ? currentStep : currentStep === 0 ? 0 : 1);
            const isCompleted =
              index <
              (formData.isEntrega ? currentStep : currentStep === 0 ? 0 : 1);

            return (
              <div key={step.key} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-primary border-primary text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    isActive ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </span>
                {index < getVisibleSteps().length - 1 && (
                  <div className="w-16 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            );
          })}
        </div>
        {/* Conteúdo da etapa */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 0 && (
            <SelecaoItensStep
              formData={formData}
              updateFormData={updateFormData}
              fontesPedido={fontesPedido}
              formasPagamento={formasPagamento}
              boards={boards}
              selectedBoard={selectedBoard}
              onBoardChange={setSelectedBoard}
              isLoading={isLoading}
            />
          )}
          {currentStep === 1 && formData.isEntrega && (
            <EnderecoStep
              formData={formData}
              updateFormData={updateFormData}
              validationErrors={validationErrors}
            />
          )}
          {currentStep === 2 && (
            <FinalizarPedidoStep
              formData={formData}
              updateFormData={updateFormData}
              total={calculateTotal()}
            />
          )}
        </div>
        {/* Botões de navegação */}
        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0 || isLoading}
          >
            Anterior
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={!canGoNext() || isLoading}>
                Próximo
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canGoNext() || isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Criando..." : "Criar Pedido"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
