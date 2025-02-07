// src/store/websocket/socket.ts
import create from 'zustand';
import { Socket } from 'socket.io-client';

interface WebSocketState {
  studentSocket: Socket | null;
  adminSocket: Socket | null;
  connect: (role: 'student' | 'admin') => void;
  disconnect: (role: 'student' | 'admin') => void;
  // 알림 상태
  hasNewOpinion: boolean;
  hasNewAgenda: boolean;
  setHasNewOpinion: (value: boolean) => void;
  setHasNewAgenda: (value: boolean) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  studentSocket: null,
  adminSocket: null,
  connect: (role) => {
    const socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:3001', {
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
