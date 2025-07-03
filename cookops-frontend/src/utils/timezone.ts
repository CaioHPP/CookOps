// utils/timezone.ts
/**
 * Utilitário para ajustar horários para o fuso horário brasileiro
 */

/**
 * Ajusta horário UTC para o fuso horário brasileiro (GMT-3)
 * @param horaUTC - Hora em UTC (0-23)
 * @returns Hora ajustada formatada como string (ex: "09:00")
 */
export function ajustarHorarioFusoBrasil(horaUTC: number): string {
  // Calcular offset para GMT-3 (fuso horário de Brasília)
  const offsetBrasilia = -3;
  const horaAjustada = (horaUTC + offsetBrasilia + 24) % 24;
  return `${horaAjustada.toString().padStart(2, "0")}:00`;
}

/**
 * Ajusta horário UTC para o fuso horário brasileiro com sufixo 'h'
 * @param horaUTC - Hora em UTC (0-23)
 * @returns Hora ajustada formatada como string (ex: "09:00h")
 */
export function ajustarHorarioFusoBrasilComSufixo(horaUTC: number): string {
  const offsetBrasilia = -3;
  const horaAjustada = (horaUTC + offsetBrasilia + 24) % 24;
  return `${horaAjustada.toString().padStart(2, "0")}:00h`;
}

/**
 * Processa dados de horários de pico ajustando para o fuso horário brasileiro
 * @param horariosPico - Array de dados de horários de pico
 * @returns Array processado com horários ajustados
 */
export function processarHorariosPicoFusoBrasil(
  horariosPico: Array<{
    hora: number;
    totalPedidos: number;
    percentualTotal: number;
  }>
): Array<{
  hora: string;
  totalPedidos: number;
  percentualTotal: number;
  horaOriginal: number;
}> {
  return horariosPico.map((horario) => ({
    hora: ajustarHorarioFusoBrasil(horario.hora),
    totalPedidos: horario.totalPedidos,
    percentualTotal: horario.percentualTotal,
    horaOriginal: horario.hora,
  }));
}
