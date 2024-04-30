/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useState, createContext, useContext } from 'react';

type SidebarContextValue = {
  SidebarState: number;
  SetSidebarState: React.Dispatch<React.SetStateAction<number>>;
};

export const Context = createContext<SidebarContextValue>({
  SidebarState: 1,
  SetSidebarState: () => {}
});

type SidebarContextProps = {
  children: ReactNode;
};

const SidebarContext = ({ children }: SidebarContextProps) => {
  const [SidebarState, SetSidebarState] = useState<number>(1);

  return (
    <Context.Provider value={{ SidebarState, SetSidebarState }}>
      {children}
    </Context.Provider>
  );
};

export const useSidebarContext = () => useContext(Context);

export default SidebarContext;
