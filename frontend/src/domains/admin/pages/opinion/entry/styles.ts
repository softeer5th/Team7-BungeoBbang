import styled from 'styled-components';
import Typography from '@/styles/Typography';

export const TopAppBarBorder = styled.div`
  border-bottom: 2px solid var(--Default-Gray-20, #e0e0e0);
  position: sticky;
  top: 50px;
`;

export const OpinionEntryContainer = styled.div`
  height: calc(100svh - 52px);
  padding: 0 0 12px 0;
  display: flex;
  flex-direction: column;
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
  color: '#a3a3a3';
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

export const OpinionText = styled(Typography)`
  color: #6f6f6f;
`;
