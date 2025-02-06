import type React from 'react';
import * as S from './styles';

export const EmptyState: React.FC = () => {
  return (
    <S.EmptyStateContainer>
      <S.EmptyStateIcon src="/assets/icons/Group.svg"></S.EmptyStateIcon>
      <S.EmptyTitleText variant="heading4">현재 들어온 문의가 없습니다.</S.EmptyTitleText>
    </S.EmptyStateContainer>
  );
};
