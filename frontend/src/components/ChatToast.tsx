import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Typography from '@/styles/Typography';

interface ChatToastProps {
  message: string;
  bottom: number;
  duration?: number;
  onDismiss?: () => void;
}

export const ChatToast = ({
  message,
  bottom = 0,
  duration = 3000,
  onDismiss = () => {},
}: ChatToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <Wrapper bottom={bottom}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <MessageBox>
              <MessageText variant="caption2">{message}</MessageText>
            </MessageBox>
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  bottom: number;
}>`
  position: fixed;
  bottom: ${(props) => props.bottom}px;
  left: 50%;
  transform: translateX(-50%);
`;

const MessageBox = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 6px 16px 6px 16px;
  border-radius: 99px;
  background-color: #1f87ff;
`;

const MessageText = styled(Typography)`
  color: #ffffff;
`;
