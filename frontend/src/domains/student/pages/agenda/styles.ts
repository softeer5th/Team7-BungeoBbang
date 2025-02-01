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

export const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 27px 0px 27px;
  background-color: ${(props) => props.theme.colors.grayScale10};
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
  padding: 17px 16px 17px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
   grid-auto-rows: min-content; 
  gap: 15px;
  flex-grow:1;
`;

export const ChatRoomListItem = styled.div`
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  border-radius: 16px;
  padding: 12px;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
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

export const DDayTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const DDayText = styled(Typography)`
  color: ${(props) => props.theme.colors.sementicMain};
`;

export const ContentWrapper = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const IconContainer = styled.div`
  width : 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const IconBox = styled.div<{
  backgroundColor: string
}>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardTitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale100};
  margin-top: 6px;
`;

export const JoinContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6px;
`;

export const JoinNumberText = styled(Typography)`
 color: ${(props) => props.theme.colors.sementicMain};
`;

export const ProgressText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale50};
  margin-left: 4px;
`;
