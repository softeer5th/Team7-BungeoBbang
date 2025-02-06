import Typography from '@/styles/Typography';
import styled from 'styled-components';

export const ChatRoomListItem = styled.div`
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  border-radius: 16px;
  padding: 12px;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
`;

export const DDayTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const DDayText = styled(Typography)<{
  isInProgress: boolean;
}>`
  color: ${(props) =>
    props.isInProgress ? props.theme.colors.sementicMain : props.theme.colors.grayScale30};
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const IconBox = styled.div<{
  backgroundColor: string;
}>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardTitleText = styled(Typography)<{
  isInProgress: boolean;
}>`
  color: ${(props) =>
    props.isInProgress ? props.theme.colors.grayScale100 : props.theme.colors.grayScale30};
  margin-top: 6px;
`;

export const JoinContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6px;
`;

export const JoinNumberText = styled(Typography)<{
  isInProgress: boolean;
}>`
  color: ${(props) =>
    props.isInProgress ? props.theme.colors.sementicMain : props.theme.colors.grayScale30};
`;

export const ProgressText = styled(Typography)<{
  isInProgress: boolean;
}>`
  color: ${(props) =>
    props.isInProgress ? props.theme.colors.grayScale50 : props.theme.colors.grayScale30};
  margin-left: 4px;
`;
