import styled, { useTheme } from 'styled-components';
import Typography from '@/styles/Typography.tsx';
import React, { Suspense, useMemo } from 'react';

import ArrowRightIcon from '/src/assets/icons/arrow-right.svg?react';
import ArrowDownIcon from '/src/assets/icons/arrow-down.svg?react';

const IconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  '/src/assets/icons/arrow-right.svg': ArrowRightIcon,
  '/src/assets/icons/arrow-down.svg': ArrowDownIcon,
};

interface MoreChatButtonProps {
  text: string;
  iconSrc: string;
  onClick: () => void;
}

const MoreChatButton = ({ text, iconSrc, onClick }: MoreChatButtonProps) => {
  const theme = useTheme();
  const IconComponent = iconSrc ? IconComponents[iconSrc] : null;

  return (
    <Container onClick={() => onClick()}>
      <Text variant="caption2">{text}</Text>
      <Suspense>
        {IconComponent && (
          <IconComponent width="16px" height="16px" stroke={theme.colors.grayScaleWhite} />
        )}
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 6px 12px 6px 12px;
  background-color: ${(props) => props.theme.colors.sementicMain};
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Text = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScaleWhite};
`;

export default MoreChatButton;
