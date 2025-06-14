"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DashboardData } from "@/types/dashboard.types";
import {
  CheckCircle,
  Clock,
  Database,
  Download,
  FileImage,
  FileText,
} from "lucide-react";
import { useCallback, useState } from "react";

interface ExportOptions {
  format: "csv" | "json" | "excel" | "pdf";
  includeCharts: boolean;
  includeMetadata: boolean;
  dateRange: "current" | "last_7_days" | "last_30_days" | "custom";
  customStartDate?: string;
  customEndDate?: string;
  compression: boolean;
  password?: string;
}

interface BackupStatus {
  isRunning: boolean;
  progress: number;
  currentStep: string;
  completed: boolean;
  error?: string;
}

interface AdvancedExportProps {
  dashboardData: DashboardData;
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedExport({
  dashboardData,
  isOpen,
  onClose,
}: AdvancedExportProps) {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "csv",
    includeCharts: false,
    includeMetadata: true,
    dateRange: "current",
    compression: false,
  });

  const [backupStatus, setBackupStatus] = useState<BackupStatus>({
    isRunning: false,
    progress: 0,
    currentStep: "",
    completed: false,
  });
  const updateOption = useCallback(
    (key: keyof ExportOptions, value: string | boolean | undefined) => {
      setExportOptions((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const simulateExport = useCallback(async () => {
    setBackupStatus({
      isRunning: true,
      progress: 0,
      currentStep: "Preparando dados...",
      completed: false,
    });

    const steps = [
      "Validando dados...",
      "Processando métricas...",
      "Gerando gráficos...",
      "Aplicando formatação...",
      "Comprimindo arquivo...",
      "Finalizando export...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBackupStatus((prev) => ({
        ...prev,
        progress: ((i + 1) / steps.length) * 100,
        currentStep: steps[i],
      }));
    }

    // Simular download
    const fileName = `cookops-dashboard-${
      new Date().toISOString().split("T")[0]
    }.${exportOptions.format}`;
    const blob = new Blob([JSON.stringify(dashboardData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setBackupStatus({
      isRunning: false,
      progress: 100,
      currentStep: "Export concluído!",
      completed: true,
    });
  }, [dashboardData, exportOptions]);

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "csv":
        return <FileText className="h-4 w-4" />;
      case "json":
        return <Database className="h-4 w-4" />;
      case "excel":
        return <FileText className="h-4 w-4" />;
      case "pdf":
        return <FileImage className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const estimateFileSize = () => {
    let baseSize = 150; // KB base

    if (exportOptions.includeCharts) baseSize += 500;
    if (exportOptions.includeMetadata) baseSize += 50;
    if (exportOptions.format === "pdf") baseSize *= 3;
    if (exportOptions.format === "excel") baseSize *= 2;
    if (exportOptions.compression) baseSize *= 0.3;

    return baseSize > 1024
      ? `${(baseSize / 1024).toFixed(1)} MB`
      : `${baseSize.toFixed(0)} KB`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Avançado de Dados
          </DialogTitle>
          <DialogDescription>
            Configure as opções de exportação para gerar relatórios
            personalizados do dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Formato de Export */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formato de Arquivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["csv", "json", "excel", "pdf"] as const).map((format) => (
                  <Button
                    key={format}
                    variant={
                      exportOptions.format === format ? "default" : "outline"
                    }
                    className="flex flex-col items-center gap-2 h-16"
                    onClick={() => updateOption("format", format)}
                  >
                    {getFormatIcon(format)}
                    <span className="text-xs uppercase">{format}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Opções de Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conteúdo do Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Incluir Gráficos</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicionar visualizações dos gráficos
                  </p>
                </div>
                <Switch
                  checked={exportOptions.includeCharts}
                  onCheckedChange={(value) =>
                    updateOption("includeCharts", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Incluir Metadados</Label>
                  <p className="text-sm text-muted-foreground">
                    Informações sobre filtros e configurações
                  </p>
                </div>
                <Switch
                  checked={exportOptions.includeMetadata}
                  onCheckedChange={(value) =>
                    updateOption("includeMetadata", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Compressão</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduzir tamanho do arquivo
                  </p>
                </div>
                <Switch
                  checked={exportOptions.compression}
                  onCheckedChange={(value) =>
                    updateOption("compression", value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Período dos Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Período dos Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Intervalo de Datas</Label>
                <Select
                  value={exportOptions.dateRange}
                  onValueChange={(value) => updateOption("dateRange", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Período Atual</SelectItem>
                    <SelectItem value="last_7_days">Últimos 7 Dias</SelectItem>
                    <SelectItem value="last_30_days">
                      Últimos 30 Dias
                    </SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {exportOptions.dateRange === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data Inicial</Label>
                    <input
                      type="date"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      onChange={(e) =>
                        updateOption("customStartDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Data Final</Label>
                    <input
                      type="date"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      onChange={(e) =>
                        updateOption("customEndDate", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proteção por Senha */}
          {(exportOptions.format === "pdf" ||
            exportOptions.format === "excel") && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Senha de Proteção (Opcional)</Label>
                  <input
                    type="password"
                    placeholder="Digite uma senha para proteger o arquivo"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    onChange={(e) => updateOption("password", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Deixe em branco para arquivo sem proteção
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informações do Export */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Formato:</span>
                <Badge variant="outline">
                  {getFormatIcon(exportOptions.format)}
                  <span className="ml-1 uppercase">{exportOptions.format}</span>
                </Badge>
              </div>

              <div className="flex justify-between text-sm">
                <span>Tamanho Estimado:</span>
                <span className="font-medium">{estimateFileSize()}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Compressão:</span>
                <span>
                  {exportOptions.compression ? "Ativada" : "Desativada"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Proteção:</span>
                <span>
                  {exportOptions.password ? "Com senha" : "Sem proteção"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Status do Export */}
          {backupStatus.isRunning && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Progresso do Export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={backupStatus.progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span>{backupStatus.currentStep}</span>
                  <span>{backupStatus.progress.toFixed(0)}%</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status de Conclusão */}
          {backupStatus.completed && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">
                    Export realizado com sucesso!
                  </span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  O arquivo foi baixado para sua pasta de downloads.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Ações */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <Button onClick={simulateExport} disabled={backupStatus.isRunning}>
            {backupStatus.isRunning ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Iniciar Export
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
