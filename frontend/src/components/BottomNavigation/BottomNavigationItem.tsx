import styled from 'styled-components';
import React from 'react';
import { IconLoadingBox } from '../IconLoadingBox';

export interface BottomNavigationItemProps {
  itemId: string;
  iconSrc: string;
  title?: string;
  hasAlarm?: boolean;
}

interface BottomNavigationItemOnlyProps {
  foregroundColor?: string;
  selectedForegroundColor?: string;
  alarmColor?: string;
  onItemClick?: (itemId: string) => void;
  selected: boolean;
}

export const BottomNavigationItem: React.FC<
  BottomNavigationItemProps & BottomNavigationItemOnlyProps
> = ({
  itemId,
  iconSrc,
  title,
  foregroundColor = '#C6C6C6',
  selectedForegroundColor = '#1F87FF',
  alarmColor = '#FF0000',
  onItemClick = () => {},
  selected = false,
  hasAlarm = false,
}) => {
  const Icon = iconSrc ? React.lazy(() => import(`${iconSrc}?react`)) : null;

  return (
    <BottomNavigationItemWrapper selected = {selected} onClick={() => onItemClick(itemId)}>
      <BottomNavigationItemContainer>
        {hasAlarm && <AlarmIcon color={alarmColor} />}
        {Icon && (
          <React.Suspense fallback={<IconLoadingBox width = "24px" height = "24px"/>}>
            <Icon
              width="24px"
              height="24px"
              style={{ marginTop: '4px' }}
              fill={selected ? selectedForegroundColor : foregroundColor}
            />
          </React.Suspense>
        )}
        {title && (
          <TitleText textColor={selected ? selectedForegroundColor : foregroundColor}>
            {title}
          </TitleText>
        )}
      </BottomNavigationItemContainer>
    </BottomNavigationItemWrapper>
  );
};

const BottomNavigationItemWrapper = styled.div<{selected: boolean}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.selected ? "#C6C6C6" : "transparent"};
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  padding-top: 4px;
`;

const BottomNavigationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AlarmIcon = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
`;

const TitleText = styled.p<{ textColor: string }>`
  margin: 0;
  margin-top: 4px;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: -2%;
  color: ${(props) => props.textColor};
  text-align: center;
`;
