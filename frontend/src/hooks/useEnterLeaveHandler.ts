import { useEffect, useRef } from 'react';
import { useSocketManager } from '@/hooks/useSocketManager';
import { useParams } from 'react-router-dom';

export const useEnterLeaveHandler = (
  roomType: 'AGENDA' | 'OPINION',
  userType: 'ADMIN' | 'STUDENT',
) => {
  const hasLeft = useRef(false);
  const hasEntered = useRef(false);
  const socketManager = useSocketManager();
  const { roomId: roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (!hasEntered.current && roomId) {
      socketManager(roomType, 'ENTER', Number(roomId), userType);
      hasEntered.current = true;
    }

    return () => {
      if (!hasLeft.current && roomId) {
        socketManager(roomType, 'LEAVE', Number(roomId), userType);

        hasLeft.current = true;
      }
    };
  }, []);
};
