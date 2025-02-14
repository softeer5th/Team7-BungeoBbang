import { useEffect, useRef } from 'react';
import { useSocketManager } from '@/hooks/useSocketManager';

export const useEnterLeaveHandler = (
  roomType: 'AGENDA' | 'OPINION',
  userType: 'ADMIN' | 'STUDENT',
) => {
  const hasLeft = useRef(false);
  const hasEntered = useRef(false);
  const socketManager = useSocketManager();

  useEffect(() => {
    if (!hasEntered.current) {
      socketManager(roomType, 'ENTER', Number(localStorage.getItem('member_id')), userType);
      hasEntered.current = true;
    }

    return () => {
      if (!hasLeft.current) {
        socketManager(roomType, 'LEAVE', Number(localStorage.getItem('member_id')), userType);
        hasLeft.current = true;
      }
    };
  }, []);
};
