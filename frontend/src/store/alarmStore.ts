import { create } from 'zustand';

interface NavigationState {
  hasNewMessage: boolean;
  setHasNewMessage: (value: boolean) => void;
}

export const useAlarmStore = create<NavigationState>((set) => ({
  hasNewMessage: false,
  setHasNewMessage: (value: boolean) => set({ hasNewMessage: value }),
}));
