import styled from 'styled-components';
import Typography from '@/styles/Typography';

export const ItemBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  border-radius: 16px;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TitleContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const IconBox = styled.div<{
  backgroundColor: string;
}>`
  min-width: 30px;
  min-height: 30px;
  max-width: 30px;
  max-height: 30px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleTextContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TitleText = styled(Typography)`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CountText = styled(Typography)`
  display: flex;
  align-items: center;
`;

export const NumOfJoinText = styled.p`
  color: ${(props) => props.theme.colors.sementicMain};
`;

export const ProgressText = styled.p`
  color: ${(props) => props.theme.colors.grayScale50};
  margin-left: 4px;
`;

export const LastSendTimeText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale30};
  white-space: nowrap;
`;

export const MessageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 19px;
`;

export const MessageText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale50};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UnreadAlarmBox = styled.div`
  min-width: 22px;
  min-height: 22px;
  max-width: 22px;
  max-height: 22px;
  background-color: ${(props) => props.theme.colors.sementicMain};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UnreadText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScaleWhite};
`;

export const UnreadAlarmWrapper = styled.div`
  width: 22px;
  height: 22px;
`;
