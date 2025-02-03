import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.grayScale10};
  min-height: 100dvh;
  overflow: hidden;
`;

export const ContentContainer = styled.div``;
