import styled from 'styled-components';
import React from 'react';
import { BorderProps } from './BorderProps';
import { IconLoadingBox } from './IconLoadingBox';

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
  foregroundColor = '#000000',
  titleColor = '#000000',
  border,
}) => {
  const LeftIcon = leftIconSrc ? React.lazy(() => import(`${leftIconSrc}?react`)) : null;
  const RightIcon = rightIconSrc ? React.lazy(() => import(`${rightIconSrc}?react`)) : null;

  return (
    <TopAppBarContainer backgroundColor={backgroundColor} border={border}>
      {LeftIcon && (
        <React.Suspense fallback={<IconLoadingBox width="24px" height="24px" />}>
          <IconWrapper onClick={onLeftIconClick}>
            <LeftIcon width="24px" height="24px" stroke={foregroundColor} />
          </IconWrapper>
        </React.Suspense>
      )}

      <TitleText titleCentered={!!leftIconSrc} titleColor={titleColor || foregroundColor}>
        {title}
      </TitleText>

      {RightIcon && (
        <React.Suspense fallback={<IconLoadingBox width="24px" height="24px" />}>
          <IconWrapper onClick={onRightIconClick}>
            <RightIcon width="24px" height="24px" fill={foregroundColor} />
          </IconWrapper>
        </React.Suspense>
      )}
    </TopAppBarContainer>
  );
};

const TopAppBarContainer = styled.div<{
  backgroundColor?: string;
  border?: {
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
  };
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 16px 5px 16px;
  background-color: ${(props) => props.backgroundColor || '#FFFFFF'};
  border: ${(props) =>
    props.border
      ? `${props.border.borderWidth || '1px'} solid ${props.border.borderColor || '#000000'}`
      : 'none'};
  border-radius: ${(props) => props.border?.borderRadius || '0px'};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const IconWrapper = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TitleText = styled.p<{ titleCentered: boolean; titleColor?: string }>`
  flex: 1;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: 130%;
  letter-spacing: -2%;
  color: ${(props) => props.titleColor || '#000000'};
  z-index: 1;
  text-align: ${(props) => (props.titleCentered ? 'center' : 'left')};
`;
