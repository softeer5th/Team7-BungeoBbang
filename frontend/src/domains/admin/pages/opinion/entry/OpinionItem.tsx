import type React from 'react';
import * as S from './styles';

interface OpinionItemProps {
  // category: string;
  title: string;
  text: string;
  time: string;
  iconColor: string;
}

export const OpinionItem: React.FC<OpinionItemProps> = ({
  // category,
  title,
  text,
  time,
  iconColor,
}) => {
  return (
    <S.OpinionItem>
      <S.CategoryIcon backgroundColor={iconColor}>{/* 아이콘 넣는곳 ! */}</S.CategoryIcon>
      <S.OpinionContent>
        <S.OpinionHeader>
          <S.OpinionTitle variant="heading4">{title}</S.OpinionTitle>
          <S.OpinionTime variant="caption2">{time}</S.OpinionTime>
        </S.OpinionHeader>
        <S.OpinionText variant="body3">{text}</S.OpinionText>
      </S.OpinionContent>
    </S.OpinionItem>
  );
};
