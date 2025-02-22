import styled from 'styled-components';
import { useEffect } from 'react';
import { BorderProps } from './border/BorderProps';
import Typography from '../styles/Typography';

import ArrowLeftIcon from '/src/assets/icons/arrow-left.svg?react';
import LogoIcon from '/src/assets/icons/logo.svg?react';
import LogoutIcon from '/src/assets/icons/logout.svg?react';
import ExitIcon from '/src/assets/icons/exit.svg?react';
import InfomationIcon from '/src/assets/icons/information-circle-contained.svg?react';
import { getBorderStyle } from './border/getBorderType';
import { updateThemeColor } from '@/utils/chat/updateThemeColor';

const IconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  '/src/assets/icons/arrow-left.svg': ArrowLeftIcon,
  '/src/assets/icons/logo.svg': LogoIcon,
  '/src/assets/icons/logout.svg': LogoutIcon,
  '/src/assets/icons/exit.svg': ExitIcon,
  '/src/assets/icons/information-circle-contained.svg': InfomationIcon,
};

interface TopAppBarProps {
  /**
   * 왼쪽 아이콘의 이미지 소스 (선택 사항)
   * @example "/assets/icons/back.svg"
   */
  leftIconSrc?: string;
  /**
   * 앱 바의 제목 (선택 사항)
   * @example "홈"
   */
  title?: string;
  /**
   * 오른쪽 아이콘의 이미지 소스 (선택 사항)
   * @example "/assets/icons/menu.svg"
   */
  rightIconSrc?: string;
  /**
   * 왼쪽 아이콘 클릭 시 호출되는 콜백 함수 (선택 사항)
   */
  onLeftIconClick?: () => void;
  /**
   * 오른쪽 아이콘 클릭 시 호출되는 콜백 함수 (선택 사항)
   */
  onRightIconClick?: () => void;
  /**
   * 앱 바의 배경색 (선택 사항)
   * @default "#FFFFFF"
   * @example "#1F87FF"
   */
  backgroundColor?: string;
  /**
   * 아이콘과 텍스트의 색상 (선택 사항)
   * @default "#000000"
   * @example "#FFFFFF"
   */
  foregroundColor?: string;
  /**
   * 제목의 색상 (선택 사항)
   * @default "#000000"
   * @example "#1F87FF"
   */
  titleColor?: string;
  /**
   * 앱 바의 테두리 스타일 (선택 사항)
   */
  border?: BorderProps;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  leftIconSrc,
  title,
  rightIconSrc,
  onLeftIconClick = () => {},
  onRightIconClick = () => {},
  backgroundColor = '#FFFFFF',
  foregroundColor = '#262626',
  titleColor,
  border,
}) => {
  const LeftIconComponent = leftIconSrc ? IconComponents[leftIconSrc] : null;
  const RightIconComponent = rightIconSrc ? IconComponents[rightIconSrc] : null;

  useEffect(() => {
    updateThemeColor(backgroundColor || '#FFFFFF');

    return () => {
      // 컴포넌트 언마운트시 기본색으로 복귀
      updateThemeColor('#FFFFFF');
    };
  }, [backgroundColor]);

  return (
    <TopAppBarContainer backgroundColor={backgroundColor} border={border}>
      {LeftIconComponent && (
        <IconWrapper onClick={onLeftIconClick}>
          <LeftIconComponent
            height="24px"
            stroke={titleColor ?? foregroundColor}
            fill={titleColor ?? foregroundColor}
          />
        </IconWrapper>
      )}

      <TitleText
        variant="heading3"
        titleCentered={!!leftIconSrc}
        titleColor={titleColor ?? foregroundColor}
      >
        {title}
      </TitleText>

      {RightIconComponent && (
        <IconWrapper onClick={onRightIconClick}>
          <RightIconComponent
            width="24px"
            height="24px"
            stroke={foregroundColor}
            fill={foregroundColor}
          />
        </IconWrapper>
      )}
      {LeftIconComponent && !RightIconComponent && <RightIconWrapper />}
    </TopAppBarContainer>
  );
};

const TopAppBarContainer = styled.div<{
  backgroundColor: string;
  border?: BorderProps;
}>`
  width: 100%;
  min-height: 40px;
  position: sticky;
  top: 0px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 16px 5px 16px;
  background-color: ${(props) => props.backgroundColor};
  ${(props) => (props.border ? getBorderStyle(props.border) : 'border: none;')}
  border-radius: ${(props) => props.border?.borderRadius || '0px'};
  z-index: 3000;
`;

const IconWrapper = styled.div`
  height: 40px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TitleText = styled(Typography)<{ titleCentered: boolean; titleColor: string }>`
  flex: 1;
  margin: 0;
  color: ${(props) => props.titleColor};
  z-index: 1;
  text-align: ${(props) => (props.titleCentered ? 'center' : 'left')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RightIconWrapper = styled.div`
  width: 40px;
  height: 40px;
`;
