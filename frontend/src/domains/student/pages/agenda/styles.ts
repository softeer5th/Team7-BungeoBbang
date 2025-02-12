import Typography from '@/styles/Typography';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  min-height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
`;

export const BodyContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.grayScale10};
`;

export const ChatRoomList = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0px;
  min-width: 0;
  position: relative;
  top: -33px;
  padding: 17px 16px 17px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: 15px;
`;

export const EmptyTextWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale40};
`;
