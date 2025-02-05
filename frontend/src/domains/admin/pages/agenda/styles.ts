import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  max-height: 100dvh;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  overflow: hidden;
`;

export const TabContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: ${(props) => props.theme.colors.grayScale10};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabContent = styled.div`
  min-width: 100%;
  max-width: 100%;
`;

export const ChatPreviewList = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 20px 16px 20px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: 15px;
  overflow: auto;
`;
