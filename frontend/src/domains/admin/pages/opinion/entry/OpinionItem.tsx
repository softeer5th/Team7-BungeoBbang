import { CategoryIcon } from '@/components/CategoryIcon';
import * as S from './styles';
import { ChatCategoryType } from '@/types/ChatCategoryType';

interface OpinionItemProps {
  category: ChatCategoryType;
  title: string;
  text: string;
  time: string;
  hasAlarm: boolean;
  createdAt: Date;
  isReminded: boolean;
  onClick?: () => void;
}

const calculateDaysDifference = (dateString: Date, now: Date): number => {
  try {
    const date = new Date(dateString);

    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = Math.abs(nowOnly.getTime() - dateOnly.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  } catch (error) {
    alert(error);
    return -1;
  }
};

export const OpinionItem: React.FC<OpinionItemProps> = ({
  category,
  title,
  text,
  time,
  hasAlarm,
  onClick,
  createdAt,
  isReminded,
}) => {
  const daysDiff = calculateDaysDifference(createdAt, new Date());
  const daysText = daysDiff === -1 ? '알수없는 에러가 발생했습니다.' : `${daysDiff}일 전`;

  return (
    <S.OpinionItem onClick={onClick}>
      <S.CategoryIconWrapper>
        {hasAlarm && <S.AlarmDot />}
        <CategoryIcon
          boxSize={60}
          iconWidth={24}
          textVariant="caption3"
          type={category}
          showText={true}
        />
      </S.CategoryIconWrapper>
      <S.OpinionContent>
        <S.OpinionHeader>
          <S.OpinionTitle variant="heading4">{title}</S.OpinionTitle>
          <S.OpinionTime variant="caption2">{time}</S.OpinionTime>
        </S.OpinionHeader>
        <S.OpinionTextContainer>
          {isReminded && <S.NewIndicator variant="body3">({daysText})</S.NewIndicator>}
          <S.OpinionText variant="body3">{text}</S.OpinionText>
        </S.OpinionTextContainer>
      </S.OpinionContent>
    </S.OpinionItem>
  );
};
