import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100dvh;
`;

export const ChatList = styled.div`
  height: 100%;
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
