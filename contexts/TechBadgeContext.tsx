"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TechBadgeContextType {
  selectedTechs: Set<string>;
  toggleTech: (tech: string) => void;
  resetSelection: () => void;
}

const TechBadgeContext = createContext<TechBadgeContextType | undefined>(undefined);

export const TechBadgeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tech.toLowerCase())) {
        newSet.delete(tech.toLowerCase());
      } else {
        newSet.add(tech.toLowerCase());
      }
      return newSet;
    });
  };

  const resetSelection = () => {
    setSelectedTechs(new Set());
  };

  return (
    <TechBadgeContext.Provider value={{ selectedTechs, toggleTech, resetSelection }}>
      {children}
    </TechBadgeContext.Provider>
  );
};

export const useTechBadge = (): TechBadgeContextType => {
  const context = useContext(TechBadgeContext);
  if (!context) {
    console.error('useTechBadge must be used within a TechBadgeProvider');
    return { selectedTechs: new Set(), toggleTech: () => {}, resetSelection: () => {} };
  }
  return context;
};
