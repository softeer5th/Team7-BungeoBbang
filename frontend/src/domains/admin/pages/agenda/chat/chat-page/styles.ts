import Typography from '@/styles/Typography';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100dvh;
  max-height: 100dvh;
`;

export const ToolTip = styled.div`
  width: 193px;
  position: absolute;
  top: 50px;
  right: 16px;
  background-color: ${(props) => props.theme.colors.sementicMain};
  padding: 10px 20px 10px 20px;
  border-radius: 12px;
  z-index: 99999;
  pointer-events: none;

  &::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -12px;
    right: 14px;
    z-index: 99998;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid ${(props) => props.theme.colors.sementicMain};
  }
`;

export const ToolTipText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScaleWhite};

    z-index: 99999;
`;

export const ChatList = styled.div`
  flex: 1;
  width: 100%;
  overflow-x: scroll;
  overflow-y: auto;
  padding: 15px 0px 15px 0px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
