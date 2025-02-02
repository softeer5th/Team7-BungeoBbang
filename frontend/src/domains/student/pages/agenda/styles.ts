import Typography from '@/styles/Typography';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  min-height: 100dvh;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.grayScale10};
`;

export const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 27px 0px 27px;
  gap: 30px;
`;

export const TextContainer = styled.div`
  width: 100%;
  margin-top: 6px;
`;

export const TitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale80};
`;

export const SubText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale50};
  margin-top: 4px;
`;

export const BannerImage = styled.img``;

export const ChatRoomList = styled.div`
  flex: 1;
  position: relative;
  top: -33px;
  padding: 17px 16px 0px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: 15px;
  flex-grow: 1;
`;



export const EmptyTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale40};
`;
