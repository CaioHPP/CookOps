"use client";

import { useDashboardSettings } from "@/hooks/useDashboardSettings";
import React, { createContext, useContext } from "react";

// Contexto para compartilhar settings globalmente
const DashboardSettingsContext = createContext<ReturnType<
  typeof useDashboardSettings
> | null>(null);

export function DashboardSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardSettings = useDashboardSettings();

  return (
    <DashboardSettingsContext.Provider value={dashboardSettings}>
      {children}
    </DashboardSettingsContext.Provider>
  );
}

export function useDashboardSettingsContext() {
  const context = useContext(DashboardSettingsContext);
  if (!context) {
    throw new Error(
      "useDashboardSettingsContext deve ser usado dentro de DashboardSettingsProvider",
    );
  }
  return context;
}
