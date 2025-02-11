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
}

export const useSocketManager = () => {
  const { socket } = useSocketStore();
  const storedMemberId = localStorage.getItem('member_id');

  return (
    roomType: SocketManagerProps['roomType'],
    event: SocketManagerProps['event'],
    roomId: number,
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
      memberId: storedMemberId,
    };
    console.log('Sending message:', messageData);

    socket.send(JSON.stringify(messageData));
  };
};
