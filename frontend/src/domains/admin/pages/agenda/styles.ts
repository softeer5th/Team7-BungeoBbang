import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  max-height: 100dvh;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  overflow: hidden;
`;

export const TabBarWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  background-color: ${(props) => props.theme.colors.grayScale10};
`;

export const ChatPreviewList = styled.div`
  width: 100%;
  max-height: 100%;
  padding: 20px 16px 20px 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: min-content;
  gap: 15px;
  overflow: auto;
`;

export const FloatingActionButton = styled.div<{
  bottom: number;
}>`
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: calc(${(props) => props.bottom}px + 17px);
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.sementicMain};
  border-radius: 50%;
  box-shadow: 0px 0px 20px #00000033;
`;
