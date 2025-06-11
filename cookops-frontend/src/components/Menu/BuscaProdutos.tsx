"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBuscaProdutos } from "@/hooks/useBuscaProdutos";
import { Search, X } from "lucide-react";

interface BuscaProdutosProps {
  placeholder?: string;
  mostrarContadores?: boolean;
  onProdutoSelecionado?: (produtoId: string) => void;
}

export function BuscaProdutos({
  placeholder = "Buscar produtos...",
  mostrarContadores = true,
  onProdutoSelecionado,
}: BuscaProdutosProps) {
  const {
    termoBusca,
    setTermoBusca,
    resultadosBusca,
    totalResultados,
    totalAtivos,
    totalInativos,
    limparBusca,
  } = useBuscaProdutos();

  return (
    <div className="space-y-4">
      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="pl-10 pr-10"
        />
        {termoBusca && (
          <Button
            variant="ghost"
            size="sm"
            onClick={limparBusca}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Contadores */}
      {mostrarContadores && (
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">Total: {totalResultados}</Badge>
          <Badge variant="default" className="bg-green-500/10 text-green-600">
            Ativos: {totalAtivos}
          </Badge>
          <Badge variant="secondary">Inativos: {totalInativos}</Badge>
        </div>
      )}

      {/* Resultados da busca */}
      {termoBusca && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Resultados da busca {termoBusca && `para "${termoBusca}"`}
          </h3>

          {resultadosBusca.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum produto encontrado
            </div>
          ) : (
            <div className="grid gap-2 max-h-60 overflow-y-auto">
              {resultadosBusca.slice(0, 10).map((produto) => (
                <div
                  key={produto.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onProdutoSelecionado?.(produto.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{produto.nome}</span>
                      <Badge
                        variant={produto.ativo ? "default" : "secondary"}
                        className={
                          produto.ativo ? "bg-green-500/10 text-green-600" : ""
                        }
                      >
                        {produto.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>{" "}
                    <div className="text-sm text-muted-foreground">
                      #{produto.codigoBarras || "N/A"} • R${" "}
                      {produto.precoBase?.toFixed(2).replace(".", ",") ||
                        "0,00"}
                    </div>
                  </div>
                </div>
              ))}

              {resultadosBusca.length > 10 && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  E mais {resultadosBusca.length - 10} produtos...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
