// src/store/socketStore.ts

import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  roomType: 'OPINION' | 'AGENDA';
  event: 'CHAT';
  opinionId?: number;
  agendaId?: number;
  message: string;
  images: string[];
  memberId: number;
  createdAt: string;
}

interface SocketState {
  socket: Socket | null;
  hasNewMessage: boolean;
  connect: (isAdmin: boolean) => void;
  disconnect: () => void;
  clearNewMessage: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  hasNewMessage: false,

  connect: (isAdmin: boolean) => {
    const accessToken = localStorage.getItem('accessToken');
    const path = isAdmin ? '/admins' : '/students';
    const socket = io(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
      auth: {
        token: `Bearer ${accessToken}`,
      },
      transports: ['websocket'],
    });

    socket.on('chat', (message: ChatMessage) => {
      // 새 메시지가 오면 알람 상태를 true로 설정
      console.log(message);
      set({ hasNewMessage: true });
    });

    set({ socket });
  },

  disconnect: () => {
    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  clearNewMessage: () => {
    set({ hasNewMessage: false });
  },
}));
