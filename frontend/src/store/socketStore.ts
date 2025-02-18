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
    // 기존 소켓과 heartbeat interval 정리
    const currentSocket = get().socket;
    const currentInterval = get().heartbeatInterval;

    if (currentSocket) {
      currentSocket.close();
    }

    if (currentInterval) {
      clearInterval(currentInterval);
      set({ heartbeatInterval: null });
    }

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
      // 이전 interval이 있다면 제거
      const prevInterval = get().heartbeatInterval;
      if (prevInterval) {
        clearInterval(prevInterval);
        set({ heartbeatInterval: null });
      }

      const interval = setInterval(() => {
        const currentWs = get().socket;
        // 현재 웹소켓이 이 interval에 해당하는 웹소켓과 같은지 확인
        if (currentWs === ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ event: 'PING' }));
          console.log('창공을 가르는 소리 PING!');
        } else {
          // 다른 웹소켓이 생성되었다면 이 interval 제거
          clearInterval(interval);
        }
      }, 20000);

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
    const interval = get().heartbeatInterval;

    if (interval) {
      clearInterval(interval);
      set({ heartbeatInterval: null });
    }

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
    set((state) => {
      const newState = {
        activeSubscriptions: {
          ...state.activeSubscriptions,
          [subscriptionKey]: { callback },
        },
      };

      // 구독 추가 시 현재 구독 목록 출력
      console.log('구독 추가:', subscriptionKey);
      console.log('현재 구독 목록:', Object.keys(newState.activeSubscriptions));

      return newState;
    });

    if (socket) {
      const messageHandler = (event: MessageEvent) => {
        try {
          if (event.data === 'PONG') {
            console.log('PONG');
            return;
          }

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
      // Remove the subscription when unmounting
      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [subscriptionKey]: removed, ...rest } = state.activeSubscriptions;

        // 구독 해제 시 현재 구독 목록 출력
        console.log('구독 해제:', subscriptionKey);
        console.log('현재 구독 목록:', Object.keys(rest));

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
