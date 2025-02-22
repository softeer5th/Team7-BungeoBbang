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
  /**
   * 아이콘을 감싸는 컨테이너의 크기 (width & height)
   * @example 40
   */
  boxSize: number;

  /**
   * 아이콘 자체의 너비 (높이는 1:1로 동일)
   * @example 24
   */
  iconWidth: number;
  /**
   * 아이콘 아래에 표시될 텍스트의 스타일 (Typography의 variant)
   * @example "body2"
   */
  textVariant?: string;
  /**
   * 아이콘의 카테고리 타입 (아이콘 및 배경 색상 정보 포함)
   */
  type: ChatCategoryType;
  /**
   * 아이콘 아래에 텍스트를 표시할지 여부
   * @default false
   */
  showText?: boolean;
  /**
   * 아이콘 클릭 시 호출되는 콜백 함수
   */
  onClick?: () => void;
  /**
   * 선택된 상태에서 아이콘 테두리 색상을 지정
   * @example "#1F87FF"
   */
  selectedBorderColor?: string;
  /**
   * 아이콘 아래 텍스트의 색상
   * @example "#A8A8A8"
   */
  textColor?: string;
  /**
   * 아이콘이 선택된 상태인지 여부
   * @default false
   */
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
