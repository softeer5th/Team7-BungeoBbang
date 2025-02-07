import create from 'zustand';
import { Socket, io } from 'socket.io-client';
import { AUTH_CONFIG } from '@/config/auth';

interface WebSocketState {
  studentSocket: Socket | null;
  adminSocket: null;
  connect: (role: 'student' | 'admin') => void;
  disconnect: (role: 'student' | 'admin') => void;
  hasNewOpinion: boolean;
  hasNewAgenda: boolean;
  setHasNewOpinion: (value: boolean) => void;
  setHasNewAgenda: (value: boolean) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  studentSocket: null,
  adminSocket: null,
  connect: (role) => {
    const baseURL = AUTH_CONFIG.API.BASE_URL;
    const endpoint = role === 'student' ? '/students' : '/admins';

    const socket = io(baseURL, {
      path: endpoint,
      transports: ['websocket'],
      query: { role },
    });

    socket.on('connect', () => {
      console.log(`${role} socket connected`);
      if (role === 'student') {
        set({ studentSocket: socket });
      } else {
        set({ adminSocket: socket });
      }
    });

    socket.on('connect_error', (error) => {
      console.error(`${role} socket connection error:`, error);
    });
  },
  disconnect: (role) => {
    if (role === 'student' && useWebSocketStore.getState().studentSocket) {
      useWebSocketStore.getState().studentSocket?.disconnect();
      set({ studentSocket: null });
    } else if (role === 'admin' && useWebSocketStore.getState().adminSocket) {
      useWebSocketStore.getState().adminSocket?.disconnect();
      set({ adminSocket: null });
    }
  },
  hasNewOpinion: false,
  hasNewAgenda: false,
  setHasNewOpinion: (value) => set({ hasNewOpinion: value }),
  setHasNewAgenda: (value) => set({ hasNewAgenda: value }),
}));
