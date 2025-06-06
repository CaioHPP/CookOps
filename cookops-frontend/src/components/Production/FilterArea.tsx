"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  LABELS_FILTRO_ENTREGA,
  TipoFiltroEntrega,
} from "@/hooks/usePedidoStatus";
import { FontePedidoResponseDto } from "@/types/dto/fontepedido/response/fontepedido-response.dto";
import { ChevronDown, Filter } from "lucide-react";

interface FilterAreaProps {
  mostrarConcluidos: boolean;
  onToggleConcluidos: () => void;
  fonteSelecionada: number | null;
  onFonteChange: (fonteId: number | null) => void;
  filtroEntrega: TipoFiltroEntrega;
  onFiltroEntregaChange: (filtro: TipoFiltroEntrega) => void;
  fontesPedido: FontePedidoResponseDto[];
}

export function FilterArea({
  mostrarConcluidos,
  onToggleConcluidos,
  fonteSelecionada,
  onFonteChange,
  filtroEntrega,
  onFiltroEntregaChange,
  fontesPedido,
}: FilterAreaProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Filtros:
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        {/* Filtro de pedidos concluídos */}
        <div className="flex items-center space-x-2">
          <Switch
            id="mostrar-concluidos"
            checked={mostrarConcluidos}
            onCheckedChange={onToggleConcluidos}
          />
          <Label htmlFor="mostrar-concluidos" className="text-sm">
            Mostrar pedidos concluídos
          </Label>
        </div>{" "}
        {/* Filtro por fonte do pedido */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="fonte-pedido" className="text-sm whitespace-nowrap">
            Fonte do pedido:
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {fonteSelecionada
                  ? fontesPedido.find((f) => f.id === fonteSelecionada)?.nome ||
                    "Fonte não encontrada"
                  : "Todas as fontes"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              <DropdownMenuItem onClick={() => onFonteChange(null)}>
                Todas as fontes
              </DropdownMenuItem>
              {fontesPedido.map((fonte) => (
                <DropdownMenuItem
                  key={fonte.id}
                  onClick={() => onFonteChange(fonte.id)}
                >
                  {fonte.nome}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>{" "}
        {/* Filtro de tipo de entrega */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="filtro-entrega" className="text-sm whitespace-nowrap">
            Tipo de pedido:
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {LABELS_FILTRO_ENTREGA[filtroEntrega]}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              {Object.entries(LABELS_FILTRO_ENTREGA).map(([key, label]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() =>
                    onFiltroEntregaChange(key as TipoFiltroEntrega)
                  }
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
