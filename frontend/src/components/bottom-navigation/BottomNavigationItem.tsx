import styled from 'styled-components';
import React from 'react';
import { IconLoadingBox } from '../IconLoadingBox';
import Typography from '../../styles/Typography';

import MessageIcon from '/src/assets/icons/message.svg?react';
import HomeIcon from '/src/assets/icons/home.svg?react';
import ProfileIcon from '/src/assets/icons/profile.svg?react';
import StatisticsIcon from '/src/assets/icons/statistics.svg?react';

const IconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  '/src/assets/icons/message.svg': MessageIcon,
  '/src/assets/icons/home.svg': HomeIcon,
  '/src/assets/icons/profile.svg': ProfileIcon,
  '/src/assets/icons/statistics.svg': StatisticsIcon,
};

export interface BottomNavigationItemProps {
  itemId: string;
  iconSrc: string;
  title?: string;
}

interface BottomNavigationItemOnlyProps {
  foregroundColor?: string;
  selectedForegroundColor?: string;
  alarmColor?: string;
  onItemClick?: (itemId: string) => void;
  hasAlarm: boolean;
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
  alarmColor = '#FF4B4B',
  onItemClick = () => {},
  selected = false,
  hasAlarm = false,
}) => {
  const IconComponent = iconSrc ? IconComponents[iconSrc] : null;

  return (
    <BottomNavigationItemWrapper
      selected={selected}
      selectedBackgroundColor={selectedForegroundColor}
      onClick={() => onItemClick(itemId)}
    >
      <BottomNavigationItemContainer>
        {hasAlarm && <AlarmIcon color={alarmColor} />}
        {IconComponent && (
          <React.Suspense fallback={<IconLoadingBox width="24px" height="24px" />}>
            <IconComponent
              width="24px"
              height="24px"
              style={{ marginTop: '4px' }}
              stroke={selected ? selectedForegroundColor : foregroundColor}
              fill={selected ? selectedForegroundColor : foregroundColor}
            />
          </React.Suspense>
        )}
        {title && (
          <TitleText
            variant="caption3"
            textColor={selected ? selectedForegroundColor : foregroundColor}
          >
            {title}
          </TitleText>
        )}
      </BottomNavigationItemContainer>
    </BottomNavigationItemWrapper>
  );
};

const BottomNavigationItemWrapper = styled.div<{
  selected: boolean;
  selectedBackgroundColor?: string;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: 'transparent';
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  padding-top: 4px;

  &:active {
    background-color: #f4f4f4;
  }
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

const TitleText = styled(Typography)<{ textColor: string }>`
  margin: 0;
  margin-top: 4px;
  color: ${(props) => props.textColor};
  text-align: center;
`;
