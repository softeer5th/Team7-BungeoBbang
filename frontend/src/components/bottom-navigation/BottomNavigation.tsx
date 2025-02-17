import styled from 'styled-components';
import { useState, forwardRef, useEffect } from 'react';
import { BottomNavigationItem, BottomNavigationItemProps } from './BottomNavigationItem';
import { BorderProps } from '../border/BorderProps';
// import { getBorderStyle } from '../border/getBorderType';
import { useSocketStore } from '@/store/socketStore';

interface BottomNavigationProps {
  startDestination: string;
  destinations: BottomNavigationItemProps[];
  backgroundColor?: string;
  foregroundColor?: string;
  selectedForegroundColor?: string;
  alarmColor?: string;
  border?: BorderProps;
  setAlarm?: boolean;
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
              if (destination.itemId === 'my') {
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
`;
