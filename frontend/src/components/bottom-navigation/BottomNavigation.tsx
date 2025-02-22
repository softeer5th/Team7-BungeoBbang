import styled from 'styled-components';
import { useState, forwardRef, useEffect } from 'react';
import { BottomNavigationItem, BottomNavigationItemProps } from './BottomNavigationItem';
import { BorderProps } from '../border/BorderProps';
import { useSocketStore } from '@/store/socketStore';

interface BottomNavigationProps {
  /**
   * 네비게이션 바의 시작 지점 (초기 선택된 탭)
   */
  startDestination: string;
   /**
   * 네비게이션 아이템 목록
   * - `itemId`: 아이템의 고유 ID
   * - `title`: 아이템의 이름
   * - `iconSrc`: 아이콘 이미지 경로
   */
  destinations: BottomNavigationItemProps[];
  /**
   * 네비게이션 배경 색상
   * @default "#FFFFFF"
   */
  backgroundColor?: string;
  /**
   * 선택되지 않은 아이콘 색상
   * @default "#A8A8A8"
   */
  foregroundColor?: string;
  /**
   * 선택된 아이콘 색상
   * @default "#1F87FF"
   */
  selectedForegroundColor?: string;
   /**
   * 알림 점의 색상
   * @default "#FF0000"
   */
  alarmColor?: string;
  /**
   * 네비게이션 테두리 
   */
  border?: BorderProps;
  /**
   * 알람 표시 여부
   * @default false
   */
  setAlarm?: boolean;
    /**
   * 네비게이션 아이템 클릭 시 호출되는 콜백 함수
   * @param itemId 클릭된 아이템의 `itemId`
   */
  onItemClick?: (itemId: string) => void;
}

export const BottomNavigation = forwardRef<HTMLDivElement, BottomNavigationProps>(
  (
    {
      startDestination,
      destinations,
      backgroundColor = '#FFFFFF',
      foregroundColor = '#C6C6C6',
      selectedForegroundColor = '#1F87FF',
      alarmColor = '#FF4B4B',
      border,
      setAlarm = false,
      onItemClick = () => {},
    },
    ref,
  ) => {
    const [selectedItem, setSelectedItem] = useState(startDestination);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const { subscribe } = useSocketStore();

    useEffect(() => {
      const unsubscribeOpinion = subscribe('OPINION', -1, () => {
        if (selectedItem !== 'my') {
          setHasNewMessage(true);
        }
      });

      const unsubscribeAgenda = subscribe('AGENDA', -1, () => {
        if (selectedItem !== 'my') {
          setHasNewMessage(true);
        }
      });
      console.log('subscribe');

      return () => {
        unsubscribeOpinion();
        unsubscribeAgenda();
        console.log('unsubscribe');
      };
    }, [selectedItem, subscribe]);

    return (
      <BottomNavigationWrapper ref={ref} backgroundColor={backgroundColor} border={border}>
        {destinations.map((destination) => (
          <BottomNavigationItem
            key={destination.itemId}
            {...destination}
            foregroundColor={foregroundColor}
            selectedForegroundColor={selectedForegroundColor}
            alarmColor={alarmColor}
            onItemClick={() => {
              setSelectedItem(destination.itemId);
              onItemClick(destination.itemId);
              if (destination.itemId === 'my' && startDestination === 'my') {
                setHasNewMessage(false);
              }
            }}
            hasAlarm={(setAlarm || hasNewMessage) && destination.itemId === 'my'}
            selected={destination.itemId === selectedItem}
          />
        ))}
      </BottomNavigationWrapper>
    );
  },
);

const BottomNavigationWrapper = styled.div<{
  backgroundColor: string;
  border?: BorderProps;
}>`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) =>
    props.border
      ? `${props.border.borderWidth || '1px'} solid ${props.border.borderColor || '#161616'}`
      : 'none'};
  border-radius: ${(props) => props.border?.borderRadius || '0px'};
  padding-bottom: env(safe-area-inset-bottom);
`;
