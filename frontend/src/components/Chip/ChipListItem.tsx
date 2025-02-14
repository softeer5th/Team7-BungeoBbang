import styled from 'styled-components';
import { BorderProps } from '../border/BorderProps';
import Typography from '../../styles/Typography';
import { getBorderStyle, getDefaultBorderStyle } from '../border/getBorderType';

export interface ChipListItemProps {
  itemId: string;
  text: string;
}

interface ChipListItemOnlyProps {
  backgroundColor?: string;
  selectedBackgroundColor?: string;
  textColor?: string;
  selectedTextColor?: string;
  border?: BorderProps;
  onChipClick: (chipId: string) => void;
  selected: boolean;
}

export const ChipListItem: React.FC<ChipListItemProps & ChipListItemOnlyProps> = ({
  itemId,
  text,
  textColor = '#A8A8A8',
  selectedTextColor = '#1F87FF',
  backgroundColor = '#F4F4F4',
  selectedBackgroundColor = '#E8F3FF',
  border = {
    ...getDefaultBorderStyle(),
    borderWidth: '1px',
    borderColor: '#C6C6C6',
    selectedBorderColor: '#1F87FF',
    borderRadius: '100px',
  },
  onChipClick = () => {},
  selected = false,
}) => {
  return (
    <ChipItemContainer
      backgroundColor={selected ? selectedBackgroundColor : backgroundColor}
      border={border}
      selected={selected}
      onClick={() => onChipClick(itemId)}
    >
      <ItemText variant="caption1" textColor={selected ? selectedTextColor : textColor}>
        {text}
      </ItemText>
    </ChipItemContainer>
  );
};

const ChipItemContainer = styled.div<{
  backgroundColor: string;
  border?: BorderProps;
  selected: boolean;
}>`
  padding: 8px 12px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  ${(props) =>
    props.border
      ? getBorderStyle({
          ...props.border,
          borderColor: props.selected ? props.border.selectedBorderColor : props.border.borderColor,
        })
      : 'border: none;'}
  border-radius: ${(props) => props.border?.borderRadius || '100px'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  flex-shrink: 0;
`;

const ItemText = styled(Typography)<{ textColor: string }>`
  color: ${(props) => props.textColor};
`;
