import styled from 'styled-components';
import React from 'react';
import { BorderProps } from './border/BorderProps';
import Typography from '../styles/Typography';

import ArrowLeftIcon from '/src/assets/icons/arrow-left.svg?react';
import LogoIcon from '/src/assets/icons/logo.svg?react';
import LogoutIcon from '/src/assets/icons/logout.svg?react';
import { getBorderStyle } from './border/getBorderType';

const IconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  '/src/assets/icons/arrow-left.svg': ArrowLeftIcon,
  '/src/assets/icons/logo.svg': LogoIcon,
  '/src/assets/icons/logout.svg': LogoutIcon,
};

interface TopAppBarProps {
  leftIconSrc?: string;
  title?: string;
  rightIconSrc?: string;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  backgroundColor?: string;
  foregroundColor?: string;
  titleColor?: string;
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
  position: sticky;
  top: 0px;
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
`;

const RightIconWrapper = styled.div`
  width: 40px;
  height: 40px;
`;
