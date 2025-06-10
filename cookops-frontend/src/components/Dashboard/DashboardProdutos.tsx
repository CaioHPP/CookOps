"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEstatisticasProdutos } from "@/hooks/useEstatisticasProdutos";
import {
  Package,
  PackageCheck,
  PackageX,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export function DashboardProdutos() {
  const {
    total,
    ativos,
    inativos,
    porcentagemAtivos,
    precoMedio,
    precoMinimo,
    precoMaximo,
    categorias,
    produtosMaisCaros,
    produtosMaisBaratos,
    temProdutos,
    getResumoEstatisticas,
  } = useEstatisticasProdutos();

  const resumo = getResumoEstatisticas();

  if (!temProdutos) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">
            Nenhum produto cadastrado ainda.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              produtos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Produtos Ativos
            </CardTitle>
            <PackageCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{ativos}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {porcentagemAtivos.toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Produtos Inativos
            </CardTitle>
            <PackageX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inativos}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {(100 - porcentagemAtivos).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {precoMedio.toFixed(2).replace(".", ",")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              R$ {precoMinimo.toFixed(2).replace(".", ",")} - R${" "}
              {precoMaximo.toFixed(2).replace(".", ",")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Produtos mais caros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Produtos Mais Caros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {produtosMaisCaros.map((produto) => (
                <div
                  key={produto.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium">{produto.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      #{produto.codigo}
                    </p>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    R$ {produto.precoBase?.toFixed(2).replace(".", ",")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Produtos mais baratos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Produtos Mais Baratos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {produtosMaisBaratos.map((produto) => (
                <div
                  key={produto.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium">{produto.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      #{produto.codigo}
                    </p>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    R$ {produto.precoBase?.toFixed(2).replace(".", ",")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(categorias).map(([categoria, quantidade]) => (
                <div
                  key={categoria}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{categoria}</span>
                  <Badge variant="secondary">{quantidade}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumo em texto */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>{resumo.resumoGeral}</p>
              <p>{resumo.resumoPrecos}</p>
              <p>{resumo.resumoStatus}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
