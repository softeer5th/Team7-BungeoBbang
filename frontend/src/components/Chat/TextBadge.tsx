import styled from 'styled-components';
import Typography from '../../styles/Typography';
import { forwardRef } from 'react';

export interface TextBadgeProps {
  /**
   * 배지에 표시될 텍스트 (선택 사항)
   * @example "NEW"
   */
  text?: string;

  /**
   * 배지의 배경 색상 (선택 사항)
   * @default "#FF0000"
   * @example "#1F87FF"
   */
  backgroundColor?: string;

  /**
   * 배지의 텍스트 색상 (선택 사항)
   * @default "#FFFFFF"
   * @example "#000000"
   */
  textColor?: string;
}

export const TextBadge = forwardRef<HTMLDivElement, TextBadgeProps>(
  ({ text, backgroundColor = '#E8F3FF', textColor = '#51A2FF' }, ref) => {
    return (
      <TextBadgeContainer ref={ref} backgroundColor={backgroundColor}>
        <Text variant="caption2" textColor={textColor}>
          {text}
        </Text>
      </TextBadgeContainer>
    );
  },
);

const TextBadgeContainer = styled.div<{
  backgroundColor: string;
}>`
  width: fit-content;
  padding: 6px 21px 6px 21px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled(Typography)<{
  textColor: string;
}>`
  color: ${(props) => props.textColor};
`;
