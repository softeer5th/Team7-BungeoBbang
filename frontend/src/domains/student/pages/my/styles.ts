import Typography from '@/styles/Typography';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.grayScale10};
  height: 100dvh;
  overflow: hidden;
`;

export const TabContentContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabContent = styled.div<{
  transX: number;
}>`
  min-width: 100%;
  max-width: 100%;

  transform: translateX(${(props) => props.transX}px);
  transition: transform 0.3s ease;
`;

export const ChatPreviewList = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 26px 16px 26px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

export const EmptyTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 21px;
`;

export const EmpytIcon = styled.img`
  width: 70px;
`;

export const EmptyText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale40};
`;
