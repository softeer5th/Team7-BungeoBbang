import React from 'react';
import styled from 'styled-components';
import Typography from '../../styles/Typography';

export interface TabBarItemProps {
  itemId: string;
  title: string;
}

interface TabBarItemOnlyProps {
  backgroundColor?: string;
  selectedBackroundColor?: string;
  textColor?: string;
  selectedTextColor?: string;
  selected: boolean;
  onItemClick?: (itemId: string) => void;
}

export const TabBarItem: React.FC<TabBarItemProps & TabBarItemOnlyProps> = ({
  itemId,
  title,
  backgroundColor = '#FFFFFF',
  selectedBackroundColor = '#FFFFFF',
  textColor = '#C6C6C6',
  selectedTextColor = '#1F87FF',
  selected = false,
  onItemClick = () => {},
}) => {
  // console.log('title', title, itemId);

  return (
    <TabBarItemContainer
      $backgroundColor={selected ? selectedBackroundColor : backgroundColor}
      onClick={() => onItemClick(itemId)}
    >
      <TitleText variant="heading3" textColor={selected ? selectedTextColor : textColor}>
        {title}
      </TitleText>
    </TabBarItemContainer>
  );
};

const TabBarItemContainer = styled.div<{
  $backgroundColor: string;
}>`
  flex: 1;
  padding: 10px 12px 12px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$backgroundColor};
`;

const TitleText = styled(Typography)<{
  textColor: string;
}>`
  color: ${(props) => props.textColor};
`;
