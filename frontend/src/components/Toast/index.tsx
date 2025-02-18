import React, { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@/styles/Typography';
import { createPortal } from 'react-dom';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose?: () => void;
}

const ToastContainer = styled.div<{ type: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  border-radius: 8px;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'error':
        return theme.colors.sementicError;
      case 'success':
        return theme.colors.sementicMain;
      default:
        return theme.colors.grayScale100;
    }
  }};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  animation: slideUp 0.3s ease-in-out forwards;
  min-width: 250px;
  max-width: 90%;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;

const ToastText = styled(Typography)`
  color: ${({ theme }) => theme.colors.grayScaleWhite};
  text-align: center;
  word-break: break-word;
  white-space: pre-line;
`;

export const Toast: React.FC<ToastProps> = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  return createPortal(
    <ToastContainer type={type}>
      <ToastText variant="body2">{message}</ToastText>
    </ToastContainer>,
    portalRoot,
  );
};
