import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({
  tabs = [], // Default to empty array
  defaultActiveTab,
  onTabChange,
  className = "",
}: TabsProps) {
  // Safe initialization with fallback
  const getInitialTab = useCallback(() => {
    if (defaultActiveTab && tabs.some((tab) => tab.id === defaultActiveTab)) {
      return defaultActiveTab;
    }
    return tabs.length > 0 ? tabs[0].id : "";
  }, [defaultActiveTab, tabs]);

  const [activeTab, setActiveTab] = useState(getInitialTab());

  // Update activeTab when tabs prop changes
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((tab) => tab.id === activeTab)) {
      const newActiveTab = getInitialTab();
      setActiveTab(newActiveTab);
    }
  }, [tabs, activeTab, getInitialTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  // Don't render if no tabs
  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className={`h-12 relative shrink-0 w-full ${className}`}>
      <div className="flex flex-col h-12 items-start justify-start relative w-full">
        {/* Tab Group */}
        <div className="flex-1 w-full relative">
          <div className="flex h-full">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                isActive={tab.id === activeTab}
                onClick={() => handleTabChange(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Border */}
        <div className="h-px w-full bg-[#CAC4D0]" />
      </div>
    </div>
  );
}

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      className="flex-1 h-full relative flex flex-col items-center justify-end overflow-hidden hover:bg-gray-50 transition-colors"
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center justify-center h-full px-4 py-3.5">
        <span
          className={clsx(
            "font-['Roboto:Medium',_sans-serif] font-medium text-[14px] text-center whitespace-nowrap tracking-[0.1px] transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          {label}
        </span>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-2 right-2 h-[3px] bg-primary rounded-t-full" />
      )}
    </button>
  );
}
