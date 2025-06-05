"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Filter } from "lucide-react";

interface FilterAreaProps {
  mostrarConcluidos: boolean;
  onToggleConcluidos: () => void;
}

export function FilterArea({
  mostrarConcluidos,
  onToggleConcluidos,
}: FilterAreaProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Filtros:
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="mostrar-concluidos"
          checked={mostrarConcluidos}
          onCheckedChange={onToggleConcluidos}
        />
        <Label htmlFor="mostrar-concluidos" className="text-sm">
          Mostrar pedidos concluídos
        </Label>
      </div>
    </div>
  );
}
