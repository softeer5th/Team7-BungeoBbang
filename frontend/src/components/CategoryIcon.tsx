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
  iconWidth: number;
  textVariant?: string;
  padding: number;
  type: ChatCategoryType;
  showText?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconWidth,
  textVariant,
  padding,
  type,
  showText = false,
  onClick = () => {},
  selected = false,
}) => {
  return (
    <IconBox
      onClick={() => onClick()}
      selected={selected}
      padding={padding || 0}
      backgroundColor={type.iconBackground}
    >
      <Icon iconWidth={iconWidth} src={type.iconSrc} />
      {showText && textVariant && (
        <IconText variant={textVariant as TypographyVariant}>{type.label}</IconText>
      )}
    </IconBox>
  );
};

const IconBox = styled.div<{
  backgroundColor: string;
  padding: number;
  selected: boolean;
}>`
  height: fit-content;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding}px;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => (props.selected ? `3px solid ${props.theme.colors.sementicMain}` : `none`)};
  border-radius: 50%;
`;

const Icon = styled.img<{
  iconWidth: number;
}>`
  width: ${(props) => props.iconWidth}px;
  aspect-ratio: 1/1;
`;

const IconText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale70};
`;
