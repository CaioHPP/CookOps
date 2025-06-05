/**
 * Utilitários para trabalhar com tempo e datas dos pedidos
 */

/**
 * Calcula o tempo decorrido desde a criação do pedido
 */
export function calcularTempoDecorrido(criadoEm: string): string {
  const agora = new Date();
  const criacao = new Date(criadoEm);
  const diffMs = agora.getTime() - criacao.getTime();
  const diffMinutos = Math.floor(diffMs / (1000 * 60));

  if (diffMinutos < 1) {
    return "Agora";
  } else if (diffMinutos < 60) {
    return `${diffMinutos}min`;
  } else if (diffMinutos < 1440) {
    // menos de 24 horas
    const horas = Math.floor(diffMinutos / 60);
    const minutosRestantes = diffMinutos % 60;
    return minutosRestantes > 0
      ? `${horas}h ${minutosRestantes}min`
      : `${horas}h`;
  } else {
    const dias = Math.floor(diffMinutos / 1440);
    const horasRestantes = Math.floor((diffMinutos % 1440) / 60);
    return horasRestantes > 0 ? `${dias}d ${horasRestantes}h` : `${dias}d`;
  }
}

/**
 * Verifica se um pedido está atrasado baseado no tempo médio de preparo
 */
export function verificarPedidoAtrasado(
  criadoEm: string,
  concluidoEm?: string,
  tempoPreparoMedio?: number
): boolean {
  if (concluidoEm || !tempoPreparoMedio) return false;

  const agora = new Date();
  const criacao = new Date(criadoEm);
  const diffMs = agora.getTime() - criacao.getTime();
  const diffMinutos = Math.floor(diffMs / (1000 * 60));

  return diffMinutos > tempoPreparoMedio;
}

/**
 * Calcula o tempo restante estimado para conclusão do pedido
 */
export function calcularTempoRestante(
  criadoEm: string,
  tempoPreparoMedio: number
): { restante: number; status: "ok" | "atencao" | "atrasado" } {
  const agora = new Date();
  const criacao = new Date(criadoEm);
  const diffMs = agora.getTime() - criacao.getTime();
  const diffMinutos = Math.floor(diffMs / (1000 * 60));

  const restante = tempoPreparoMedio - diffMinutos;

  let status: "ok" | "atencao" | "atrasado" = "ok";

  if (restante < 0) {
    status = "atrasado";
  } else if (restante < tempoPreparoMedio * 0.2) {
    // menos de 20% do tempo restante
    status = "atencao";
  }

  return { restante, status };
}

/**
 * Formata data para exibição amigável
 */
export function formatarDataAmigavel(data: string): string {
  const date = new Date(data);
  const agora = new Date();

  // Verifica se é hoje
  if (date.toDateString() === agora.toDateString()) {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Verifica se é ontem
  const ontem = new Date(agora);
  ontem.setDate(ontem.getDate() - 1);
  if (date.toDateString() === ontem.toDateString()) {
    return `Ontem ${date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Data completa
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Obtém tempo médio de preparo do sessionStorage
 */
export function obterTempoPreparoMedio(): number {
  if (typeof window === "undefined") return 30;

  const tempo = sessionStorage.getItem("tempoPreparoMedio");
  return tempo ? parseInt(tempo, 10) : 30;
}

/**
 * Calcula o tempo decorrido desde a criação do pedido com tempo customizável
 */
export function calcularTempoDecorridoComTempo(
  criadoEm: string,
  agora: Date
): string {
  const criacao = new Date(criadoEm);
  const diffMs = agora.getTime() - criacao.getTime();
  const diffMinutos = Math.floor(diffMs / (1000 * 60));

  if (diffMinutos < 1) {
    return "Agora";
  } else if (diffMinutos < 60) {
    return `${diffMinutos}min`;
  } else if (diffMinutos < 1440) {
    // menos de 24 horas
    const horas = Math.floor(diffMinutos / 60);
    const minutosRestantes = diffMinutos % 60;
    return minutosRestantes > 0
      ? `${horas}h ${minutosRestantes}min`
      : `${horas}h`;
  } else {
    const dias = Math.floor(diffMinutos / 1440);
    const horasRestantes = Math.floor((diffMinutos % 1440) / 60);
    return horasRestantes > 0 ? `${dias}d ${horasRestantes}h` : `${dias}d`;
  }
}

/**
 * Calcula o tempo restante estimado para conclusão do pedido com tempo customizável
 */
export function calcularTempoRestanteComTempo(
  criadoEm: string,
  tempoPreparoMedio: number,
  agora: Date
): { restante: number; status: "ok" | "atencao" | "atrasado" } {
  const criacao = new Date(criadoEm);
  const diffMs = agora.getTime() - criacao.getTime();
  const diffMinutos = Math.floor(diffMs / (1000 * 60));

  const restante = tempoPreparoMedio - diffMinutos;

  let status: "ok" | "atencao" | "atrasado" = "ok";

  if (restante < 0) {
    status = "atrasado";
  } else if (restante < tempoPreparoMedio * 0.2) {
    // menos de 20% do tempo restante
    status = "atencao";
  }

  return { restante, status };
}
