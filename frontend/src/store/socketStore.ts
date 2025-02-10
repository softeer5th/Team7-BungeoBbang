// src/store/socketStore.ts
import { create } from 'zustand';

export interface ChatMessage {
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
  socket: WebSocket | null;
  hasNewMessage: boolean;
  connect: (isAdmin: boolean) => void;
  disconnect: () => void;
  clearNewMessage: () => void;
  subscribe: (destination: string, callback: (message: ChatMessage) => void) => () => void;
  sendMessage: (
    roomType: 'OPINION' | 'AGENDA',
    roomId: number,
    message: string,
    images: string[],
  ) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  hasNewMessage: false,

  connect: (isAdmin: boolean) => {
    const accessToken = localStorage.getItem('access_token');
    const namespace = isAdmin ? '/admins' : '/students';
    const socketUrl = new URL(
      `${namespace}`,
      import.meta.env.VITE_API_BASE_URL.replace('http', 'ws'),
    );

    const ws = new WebSocket(socketUrl.toString(), [accessToken]);

    ws.onopen = () => {
      console.log('WebSocket connected successfully');
      set({ socket: ws });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      set({ socket: null });

      setTimeout(() => {
        if (!get().socket) {
          get().connect(isAdmin);
        }
      }, 3000);
    };
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },

  clearNewMessage: () => {
    set({ hasNewMessage: false });
  },

  subscribe: (destination, callback) => {
    const socket = get().socket;

    if (socket) {
      const messageHandler = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as ChatMessage;
          // destination 필터링
          if (data.roomType === destination) {
            callback(data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      socket.addEventListener('message', messageHandler);

      return () => {
        socket.removeEventListener('message', messageHandler);
      };
    }

    return () => {};
  },

  sendMessage: async (roomType, roomId, messageContent, images) => {
    const socket = get().socket;
    const storedMemberId = localStorage.getItem('member_id');
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    const messageData = {
      roomType,
      event: 'CHAT',
      ...(roomType === 'OPINION' ? { opinionId: roomId } : { agendaId: roomId }),
      message: messageContent,
      images,
      memberId: storedMemberId,
    };
    console.log('Sending message:', messageData);

    socket.send(JSON.stringify(messageData));
  },
}));
