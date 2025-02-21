import styled from 'styled-components';
import Typography from '@/styles/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
`;
export const TopAppBarBorder = styled.div`
  border-bottom: 2px solid var(--Default-Gray-20, #e0e0e0);
  position: sticky;
  top: 50px;
`;

export const OpinionEntryContainer = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  height: 100dvh;
`;

export const ChipListContainer = styled.div`
  position: sticky;
  top: 52px;
  background-color: #ffffff;
  z-index: 1;
  padding-top: 12px;
`;

export const EmptyStateContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EmptyStateIcon = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 21px;
`;

export const EmptyTitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale40};
`;

export const OpinionList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OpinionItem = styled.div`
  display: flex;
  padding: 20px 16px 20px 16px;
  border-bottom: 1px solid #e0e0e0;
  gap: 16px;
`;

export const CategoryIconWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

export const AlarmDot = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  width: 12px;
  height: 12px;
  background-color: #1f87ff; // 파란색 점
  border-radius: 50%;
  z-index: 1;
`;

export const CategoryIcon = styled.div<{ backgroundColor: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OpinionContent = styled.div`
  flex: 1;
  word-break: break-word;
`;

export const OpinionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const OpinionTitle = styled(Typography)``;

export const OpinionTime = styled(Typography)`
  color: #a8a8a8;
`;
export const OpinionTextContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const NewIndicator = styled(Typography)`
  color: ${(props) => props.theme.colors.sementicMain};
  white-space: nowrap;
`;

export const OpinionText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale60};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
