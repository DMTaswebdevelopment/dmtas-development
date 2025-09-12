import { create } from "zustand";

// Define the interface for SubGlobalNavigation store
interface SubGlobalNavigationState {
  subGlobalNavigation: string;
  setSubGlobalNavigation: (subGlobalNavigation: string) => void;
}

// Define the interface for MenuControl store
interface MenuControlState {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const useSubGlobalNavigation = create<SubGlobalNavigationState>(
  (set) => ({
    subGlobalNavigation: "", // default value
    setSubGlobalNavigation: (subGlobalNavigation: string) =>
      set(() => ({ subGlobalNavigation })),
  })
);

export const useMenuControl = create<MenuControlState>((set) => ({
  isMenuOpen: false, // default value
  setIsMenuOpen: (isMenuOpen: boolean) => set(() => ({ isMenuOpen })),
}));
