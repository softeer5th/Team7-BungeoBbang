// src/store/socketStore.ts
import { create } from 'zustand';

export interface ChatMessage {
  roomType: 'OPINION' | 'AGENDA';
  event: 'CHAT';
  opinionId?: number;
  agendaId?: number;
  message: string;
  images: string[];
  memberId?: number;
  adminId?: number;
  createdAt: string;
}

interface SocketState {
  socket: WebSocket | null;
  hasNewMessage: boolean;
  activeSubscriptions: { [key: string]: { callback: (message: ChatMessage) => void } };
  connect: (isAdmin: boolean) => void;
  disconnect: () => void;
  clearNewMessage: () => void;
  subscribe: (
    roomType: 'OPINION' | 'AGENDA',
    roomId: number,
    callback: (message: ChatMessage) => void,
  ) => () => void;
  sendMessage: (
    roomType: 'OPINION' | 'AGENDA',
    roomId: number,
    message: string,
    images: string[],
    isAdmin: boolean,
  ) => void;
  heartbeatInterval?: NodeJS.Timeout | null;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  hasNewMessage: false,
  activeSubscriptions: {},

  connect: (isAdmin: boolean) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const namespace = isAdmin ? '/admins' : '/students';
    const socketUrl = new URL(
      `${namespace}`,
      import.meta.env.VITE_API_BASE_URL.replace('http', 'ws'),
    );

    const ws = new WebSocket(socketUrl.toString(), [accessToken]);

    const startHeartbeat = () => {
      const currentInterval = get().heartbeatInterval;
      if (currentInterval !== null && currentInterval !== undefined) {
        clearInterval(currentInterval);
      }

      const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ event: 'PING' }));
          console.log('Sent heartbeat');
        }
      }, 10000);

      set({ heartbeatInterval: interval });
    };

    ws.onopen = () => {
      console.log('WebSocket connected successfully');
      set({ socket: ws });
      startHeartbeat();

      // Resubscribe all active subscriptions
      const activeSubscriptions = get().activeSubscriptions;
      Object.entries(activeSubscriptions).forEach(([key, subscription]) => {
        const [roomType, roomId] = key.split(':');
        subscription.callback &&
          get().subscribe(
            roomType as 'OPINION' | 'AGENDA',
            parseInt(roomId),
            subscription.callback,
          );
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      set({ socket: null });

      // Clear heartbeat interval
      const currentInterval = get().heartbeatInterval;
      if (currentInterval !== null && currentInterval !== undefined) {
        clearInterval(currentInterval);
        set({ heartbeatInterval: null });
      }

      setTimeout(() => {
        if (!get().socket) {
          get().connect(isAdmin);
        }
      }, 5000);
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

  subscribe: (
    roomType: 'OPINION' | 'AGENDA',
    roomId: number,
    callback: (message: ChatMessage) => void,
  ) => {
    const socket = get().socket;
    const subscriptionKey = `${roomType}:${roomId}`;

    // Store the subscription
    set((state) => ({
      activeSubscriptions: {
        ...state.activeSubscriptions,
        [subscriptionKey]: { callback },
      },
    }));

    if (socket) {
      const messageHandler = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as ChatMessage;
          console.log('Received message:', data);

          if (
            data.roomType === roomType &&
            ((roomType === 'OPINION' && data.opinionId === roomId) ||
              (roomType === 'AGENDA' && data.agendaId === roomId))
          ) {
            callback(data);
          } else if (roomId === -1) {
            callback(data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          console.log('Raw message:', event.data);
        }
      };

      socket.addEventListener('message', messageHandler);

      return () => {
        socket.removeEventListener('message', messageHandler);
        // Remove the subscription when unmounting
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [subscriptionKey]: removed, ...rest } = state.activeSubscriptions;
          return { activeSubscriptions: rest };
        });
      };
    }

    return () => {
      // Remove the subscription when unmounting even if there was no socket
      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [subscriptionKey]: removed, ...rest } = state.activeSubscriptions;
        return { activeSubscriptions: rest };
      });
    };
  },

  sendMessage: async (roomType, roomId, messageContent, images, isAdmin) => {
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
      ...(isAdmin ? { adminId: Number(storedMemberId) } : { memberId: Number(storedMemberId) }),
    };
    console.log('Sending message:', messageData);

    socket.send(JSON.stringify(messageData));
  },
}));
