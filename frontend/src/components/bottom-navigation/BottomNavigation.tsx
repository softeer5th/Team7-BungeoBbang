import styled from 'styled-components';
import React, { useState } from 'react';
import { BottomNavigationItem, BottomNavigationItemProps } from './BottomNavigationItem';
import { BorderProps } from '../BorderProps';

interface BottomNavigationProps {
  startDestination: string;
  destinations: BottomNavigationItemProps[];
  backgroundColor?: string;
  foregroundColor?: string;
  selectedForegroundColor?: string;
  alarmColor?: string;
  border?: BorderProps;
  onItemClick?: (itemId: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  startDestination,
  destinations,
  backgroundColor = '#FFFFFF',
  foregroundColor = '#C6C6C6',
  selectedForegroundColor = '#1F87FF',
  alarmColor = '#FF4B4B',
  border,
  onItemClick = () => {},
}) => {
  const [selectedItem, setSelectedItem] = useState(startDestination);

  return (
    <BottomNavigationWrapper backgroundColor={backgroundColor} border={border}>
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
          }}
          selected={destination.itemId === selectedItem}
        />
      ))}
    </BottomNavigationWrapper>
  );
};

const BottomNavigationWrapper = styled.div<{
  backgroundColor: string;
  border?: BorderProps;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) =>
    props.border
      ? `${props.border.borderWidth || '1px'} solid ${props.border.borderColor || '#000000'}`
      : 'none'};
  border-radius: ${(props) => props.border?.borderRadius || '0px'};
`;
