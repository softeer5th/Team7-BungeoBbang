import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 102px 0 8px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const SubTitle = styled.p`
  font-size: 14px;
  color: #1f87ff;
  font-weight: 600;
`;

export const ChipListWrapper = styled.div`
  margin: 24px -20px;
`;

export const CharCount = styled.span`
  position: absolute;
  right: 16px;
  bottom: 90px;
  color: #a8a8a8;
  font-size: 12px;
`;
