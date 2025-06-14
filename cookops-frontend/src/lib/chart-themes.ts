/**
 * Temas de cores para gráficos baseados nas variáveis CSS do sistema
 * Seguindo princípios do círculo cromático para harmonia visual
 */

export const CHART_THEMES = {
  // Tema 1: Roxo & Dourado (Cores complementares - harmonia clássica)
  purple: {
    name: "Roxo & Dourado",
    description: "Elegante e profissional",
    colors: [
      "#9333ea", // Roxo principal
      "#f59e0b", // Dourado/Amarelo
      "#3b82f6", // Azul
      "#f97316", // Laranja
      "#8b5cf6", // Roxo secundário
      "#10b981", // Verde
      "#ef4444", // Vermelho
      "#f59e0b", // Laranja secundário
      "#06b6d4", // Verde azulado
      "#eab308", // Amarelo claro
    ],
  },

  // Tema 2: Oceano (Cores análogas - azul, verde, ciano)
  ocean: {
    name: "Oceano",
    description: "Calmo e confiável",
    colors: [
      "#3b82f6", // Azul principal
      "#06b6d4", // Verde azulado
      "#10b981", // Verde
      "#9333ea", // Roxo (contraste)
      "#f59e0b", // Dourado (destaque)
      "#8b5cf6", // Roxo secundário
      "#eab308", // Amarelo (contraste suave)
      "#f97316", // Laranja (contraste quente)
      "#ef4444", // Vermelho (contraste forte)
      "#f59e0b", // Laranja secundário
    ],
  },

  // Tema 3: Pôr do Sol (Cores quentes - vermelho, laranja, amarelo)
  sunset: {
    name: "Pôr do Sol",
    description: "Vibrante e energético",
    colors: [
      "#f97316", // Laranja principal
      "#ef4444", // Vermelho
      "#f59e0b", // Dourado/Amarelo
      "#fb923c", // Laranja secundário
      "#eab308", // Amarelo claro
      "#9333ea", // Roxo (contraste frio)
      "#3b82f6", // Azul (contraste frio)
      "#06b6d4", // Verde azulado (contraste)
      "#10b981", // Verde (contraste natural)
      "#8b5cf6", // Roxo secundário
    ],
  },
} as const;

export type ChartTheme = keyof typeof CHART_THEMES;

/**
 * Obtém uma cor específica do tema selecionado
 * @param theme - Tema selecionado
 * @param index - Índice da cor (0-9)
 * @returns String CSS da cor
 */
export function getChartColor(theme: ChartTheme, index: number): string {
  const colors = CHART_THEMES[theme].colors;
  return colors[index % colors.length];
}

/**
 * Obtém todas as cores de um tema
 * @param theme - Tema selecionado
 * @returns Array com todas as cores do tema
 */
export function getThemeColors(theme: ChartTheme): readonly string[] {
  return CHART_THEMES[theme].colors;
}

/**
 * Obtém informações completas de um tema
 * @param theme - Tema selecionado
 * @returns Objeto com informações do tema
 */
export function getThemeInfo(theme: ChartTheme) {
  return CHART_THEMES[theme];
}
