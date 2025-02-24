import { useSocketStore } from '@/store/socketStore';

interface SocketManagerProps {
  roomType: 'OPINION' | 'AGENDA';
  event:
    | 'ENTER'
    | 'CHAT'
    | 'LEAVE'
    | 'EXIT'
    | 'PARTICIPATE'
    | 'START'
    | 'CLOSE'
    | 'DELETE'
    | 'ERROR';
  roomId: number;
  userType: 'ADMIN' | 'STUDENT';
}

export const useSocketManager = () => {
  const socket = useSocketStore((state) => state.socket);
  const storedMemberId = localStorage.getItem('member_id');

  return (
    roomType: SocketManagerProps['roomType'],
    event: SocketManagerProps['event'],
    roomId: number,
    userType: SocketManagerProps['userType'],
  ) => {
    if (storedMemberId === null) {
      alert('로그인이 필요합니다');
      localStorage.clear();
      window.location.href = '/';
      return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    const messageData = {
      roomType,
      event: event,
      ...(roomType === 'OPINION' ? { opinionId: roomId } : { agendaId: roomId }),
      ...(userType === 'ADMIN'
        ? { adminId: Number(storedMemberId) }
        : { memberId: Number(storedMemberId) }),
    };
    console.log('Sending message:', messageData);

    socket.send(JSON.stringify(messageData));
  };
};
