import { create } from 'zustand';

interface AppState {
  mood?: string;
  budget?: string;
  setMood: (mood: string) => void;
  setBudget: (budget: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mood: undefined,
  budget: undefined,
  setMood: (mood) => set({ mood }),
  setBudget: (budget) => set({ budget }),
}));
