"use client";

import { ProdutoService } from "@/api/services/produto.service";
import { BoardSelector } from "@/components/Production/BoardSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { FontePedidoResponseDto } from "@/types/dto/fontepedido/response/fontepedido-response.dto";
import { FormaPagamentoResponseDto } from "@/types/dto/formapagamento/response/formapagamento-response.dto";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { ChevronDown, Minus, Plus, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { PedidoFormData, PedidoItem } from "../NovoPedidoModal";

interface SelecaoItensStepProps {
  formData: PedidoFormData;
  updateFormData: (updates: Partial<PedidoFormData>) => void;
  fontesPedido: FontePedidoResponseDto[];
  formasPagamento: FormaPagamentoResponseDto[];
  boards: BoardResponseDto[];
  selectedBoard: string;
  onBoardChange: (boardId: string) => void;
  isLoading: boolean;
}

export function SelecaoItensStep({
  formData,
  updateFormData,
  fontesPedido,
  formasPagamento,
  boards,
  selectedBoard,
  onBoardChange,
  isLoading,
}: SelecaoItensStepProps) {
  const [produtos, setProdutos] = useState<ProdutoResponseDto[]>([]);
  const [busca, setBusca] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState<
    ProdutoResponseDto[]
  >([]);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  // Carregar produtos
  useEffect(() => {
    loadProdutos();
  }, []); // Preseleção dos dropdowns quando os dados são carregados
  useEffect(() => {
    console.log("🔧 Preseleção fonte:", {
      fontesPedidoLength: fontesPedido.length,
      currentFonteId: formData.fonteId,
      fontesPedido: fontesPedido.map((f) => ({ id: f.id, nome: f.nome })),
    });
    if (fontesPedido.length > 0 && !formData.fonteId) {
      console.log("✅ Definindo fonte automaticamente:", fontesPedido[0]);
      updateFormData({ fonteId: fontesPedido[0].id });
    }
  }, [fontesPedido, formData.fonteId, updateFormData]);

  useEffect(() => {
    console.log("🔧 Preseleção pagamento:", {
      formasPagamentoLength: formasPagamento.length,
      currentPagamentoId: formData.pagamentoId,
      formasPagamento: formasPagamento.map((f) => ({ id: f.id, nome: f.nome })),
    });
    if (formasPagamento.length > 0 && !formData.pagamentoId) {
      console.log(
        "✅ Definindo pagamento automaticamente:",
        formasPagamento[0]
      );
      updateFormData({ pagamentoId: formasPagamento[0].id });
    }
  }, [formasPagamento, formData.pagamentoId, updateFormData]);

  // Filtrar produtos por busca (máximo 3 resultados)
  useEffect(() => {
    if (!busca.trim()) {
      setProdutosFiltrados([]);
    } else {
      const filtered = produtos
        .filter(
          (produto) =>
            produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
            produto.codigoBarras?.toLowerCase().includes(busca.toLowerCase())
        )
        .slice(0, 3); // Máximo 3 resultados
      setProdutosFiltrados(filtered);
    }
  }, [busca, produtos]);

  const loadProdutos = async () => {
    try {
      setLoadingProdutos(true);
      const empresaId = sessionStorage.getItem("empresaId") || "";
      const data = await ProdutoService.getProdutosByEmpresa(empresaId);
      setProdutos(data.filter((p) => p.ativo));
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoadingProdutos(false);
    }
  };

  const getQuantidadeNoCarrinho = useCallback(
    (produtoId: string) => {
      const item = formData.itens.find((item) => item.produto.id === produtoId);
      return item?.quantidade || 0;
    },
    [formData.itens]
  );

  const adicionarItem = useCallback(
    (produto: ProdutoResponseDto) => {
      const itemExistente = formData.itens.find(
        (item) => item.produto.id === produto.id
      );

      if (itemExistente) {
        const novosItens = formData.itens.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
        updateFormData({ itens: novosItens });
      } else {
        const novoItem: PedidoItem = {
          produto,
          quantidade: 1,
          observacao: "",
        };
        updateFormData({ itens: [...formData.itens, novoItem] });
      }
    },
    [formData.itens, updateFormData]
  );

  const atualizarQuantidade = useCallback(
    (produtoId: string, novaQuantidade: number) => {
      if (novaQuantidade <= 0) {
        const novosItens = formData.itens.filter(
          (item) => item.produto.id !== produtoId
        );
        updateFormData({ itens: novosItens });
        return;
      }

      const novosItens = formData.itens.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      );
      updateFormData({ itens: novosItens });
    },
    [formData.itens, updateFormData]
  );

  const removerItem = useCallback(
    (produtoId: string) => {
      const novosItens = formData.itens.filter(
        (item) => item.produto.id !== produtoId
      );
      updateFormData({ itens: novosItens });
    },
    [formData.itens, updateFormData]
  );

  const atualizarObservacao = useCallback(
    (produtoId: string, observacao: string) => {
      const novosItens = formData.itens.map((item) =>
        item.produto.id === produtoId ? { ...item, observacao } : item
      );
      updateFormData({ itens: novosItens });
    },
    [formData.itens, updateFormData]
  );

  const calcularSubtotal = () => {
    return formData.itens.reduce(
      (acc, item) => acc + item.produto.precoBase * item.quantidade,
      0
    );
  };

  return (
    <div className="space-y-6">
      {/* Seleção de Board */}
      <Card>
        <CardHeader>
          <CardTitle>Board de Produção</CardTitle>
        </CardHeader>
        <CardContent>
          <BoardSelector
            boards={boards}
            selectedBoard={selectedBoard}
            onBoardChange={onBoardChange}
            loading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Configurações do Pedido */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fonte">Fonte do Pedido</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {formData.fonteId
                      ? fontesPedido.find((f) => f.id === formData.fonteId)
                          ?.nome || "Selecione a fonte"
                      : "Selecione a fonte"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {fontesPedido.map((fonte) => (
                    <DropdownMenuItem
                      key={fonte.id}
                      onClick={() => updateFormData({ fonteId: fonte.id })}
                    >
                      {fonte.nome}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pagamento">Forma de Pagamento</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {formData.pagamentoId
                      ? formasPagamento.find(
                          (f) => f.id === formData.pagamentoId
                        )?.nome || "Selecione o pagamento"
                      : "Selecione o pagamento"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {formasPagamento.map((forma) => (
                    <DropdownMenuItem
                      key={forma.id}
                      onClick={() => updateFormData({ pagamentoId: forma.id })}
                    >
                      {forma.nome}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="entrega"
              checked={formData.isEntrega}
              onCheckedChange={(checked) =>
                updateFormData({ isEntrega: checked })
              }
            />
            <Label htmlFor="entrega">É entrega/delivery</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacao">Observações do Pedido</Label>
            <Textarea
              id="observacao"
              placeholder="Observações gerais do pedido..."
              value={formData.observacao}
              onChange={(e) => updateFormData({ observacao: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Busca de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />{" "}
            <Input
              placeholder="Buscar produtos por nome ou código..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && produtosFiltrados.length === 1) {
                  adicionarItem(produtosFiltrados[0]);
                  setBusca("");
                }
              }}
              className="pl-10"
            />
          </div>

          {loadingProdutos ? (
            <div className="py-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">
                Carregando produtos...
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {produtosFiltrados.map((produto) => {
                const quantidadeNoCarrinho = getQuantidadeNoCarrinho(
                  produto.id
                );
                return (
                  <div
                    key={produto.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                    onClick={() => adicionarItem(produto)}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{produto.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        #{produto.codigoBarras} • R${" "}
                        {produto.precoBase.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {quantidadeNoCarrinho > 0 && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          {quantidadeNoCarrinho}
                        </span>
                      )}
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}{" "}
              {busca && produtosFiltrados.length === 0 && (
                <p className="py-4 text-center text-muted-foreground">
                  Nenhum produto encontrado
                </p>
              )}
              {!busca && (
                <p className="py-4 text-center text-muted-foreground">
                  Digite o nome ou código de um produto para buscar
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Itens Selecionados */}
      {formData.itens.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Itens do Pedido ({formData.itens.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.itens.map((item) => (
                <div key={item.produto.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-medium">{item.produto.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        R$ {item.produto.precoBase.toFixed(2).replace(".", ",")}{" "}
                        cada
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          atualizarQuantidade(
                            item.produto.id,
                            item.quantidade - 1
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantidade}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          atualizarQuantidade(
                            item.produto.id,
                            item.quantidade + 1
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removerItem(item.produto.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Input
                      placeholder="Observações do item..."
                      value={item.observacao || ""}
                      onChange={(e) =>
                        atualizarObservacao(item.produto.id, e.target.value)
                      }
                      className="flex-1 mr-4"
                    />
                    <p className="font-semibold">
                      R${" "}
                      {(item.produto.precoBase * item.quantidade)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span>
                    R$ {calcularSubtotal().toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
