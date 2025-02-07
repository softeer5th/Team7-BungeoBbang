import { CategoryIcon } from '@/components/CategoryIcon';
import Typography from '@/styles/Typography';
import { ChatCategoryType } from '@/types/ChatCategoryType';
import styled from 'styled-components';

interface CategoryContentProps {
  selectedType?: ChatCategoryType | null;
  onItemClick?: (type: ChatCategoryType) => void;
}

export const CategoryContent = ({
  selectedType = null,
  onItemClick = () => {},
}: CategoryContentProps) => {
  const categories = [
    ChatCategoryType.ACADEMICS,
    ChatCategoryType.FACILITIES,
    ChatCategoryType.CLUBS,
    ChatCategoryType.EVENTS,
    ChatCategoryType.BUDGET,
    ChatCategoryType.IT,
    ChatCategoryType.TRANSPORTATION,
    ChatCategoryType.OTHER,
  ];

  return (
    <Container>
      <TitleText variant="heading1">카테고리를 선택해주세요</TitleText>
      <CategoryList>
        {categories.map((category) => {
          return (
            <CategoryIcon
              selected={category === selectedType}
              boxSize={70}
              iconWidth={28}
              textVariant="caption2"
              type={category}
              showText={true}
              onClick={() => onItemClick(category)}
            />
          );
        })}
      </CategoryList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const TitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale100};
`;

const CategoryList = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;
