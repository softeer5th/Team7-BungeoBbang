import styled from 'styled-components';
import Typography from '../styles/Typography';
import { ChatCategoryType } from '@/types/ChatCategoryType';

type TypographyVariant =
  | 'display1'
  | 'display2'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'caption1'
  | 'caption2'
  | 'caption3';

interface CategoryIconProps {
  boxSize: number;
  iconWidth: number;
  textVariant?: string;
  type: ChatCategoryType;
  showText?: boolean;
  onClick?: () => void;
  selectedBorderColor?: string;
  textColor?: string;
  selected?: boolean;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  boxSize,
  iconWidth,
  textVariant,
  type,
  showText = false,
  onClick = () => {},
  selectedBorderColor = '#1F87FF',
  textColor = '#525252',
  selected = false,
}) => {
  return (
    <IconBox
      size={boxSize}
      onClick={() => onClick()}
      selected={selected}
      selectedBorderColor={selectedBorderColor}
      backgroundColor={type.iconBackground}
    >
      <Icon iconWidth={iconWidth} src={type.iconSrc} />

      {showText && textVariant && (
        <IconText variant={textVariant as TypographyVariant} textColor={textColor}>
          {type.label}
        </IconText>
      )}
    </IconBox>
  );
};

const IconBox = styled.div<{
  size: number;
  backgroundColor: string;
  selectedBorderColor: string;
  selected: boolean;
}>`
  width: ${(props) => props.size}px;
  aspect-ratio: 1/1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => (props.selected ? `3px solid ${props.selectedBorderColor}` : `none`)};
  border-radius: 50%;
`;

const Icon = styled.img<{
  iconWidth: number;
}>`
  width: ${(props) => props.iconWidth}px;
  aspect-ratio: 1/1;
`;

const IconText = styled(Typography)<{
  textColor: string;
}>`
  color: ${(props) => props.textColor};
  white-space: nowrap;
  margin-top: 4px;
`;
