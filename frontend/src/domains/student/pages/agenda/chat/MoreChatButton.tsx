import styled, { useTheme } from 'styled-components';
import Typography from '@/styles/Typography.tsx';
import React, { Suspense, useMemo } from 'react';

interface MoreChatButtonProps {
  text: string;
  iconSrc: string;
  onClick: () => void;
}

const MoreChatButton = ({ text, iconSrc, onClick }: MoreChatButtonProps) => {
  const theme = useTheme();
  const Icon = useMemo(() => {
    return React.lazy(() => /* @vite-ignore */ import(`${iconSrc}?react`));
  }, [iconSrc]);

  return (
    <Container onClick={() => onClick()}>
      <Text variant="caption2">{text}</Text>
      <Suspense>
        <Icon width="16px" height="16px" stroke={theme.colors.grayScaleWhite} />
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
