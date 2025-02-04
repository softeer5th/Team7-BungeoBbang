import styled from 'styled-components';
import BannerImg from '/src/assets/imgs/school_banner.png';
import Typography from '@/styles/Typography';

export const BannerContainer = () => {
  return (
    <Container>
      <TextContainer>
        <TitleText variant="heading1">함께 만들어 나가요</TitleText>
        <SubText variant="body3">학생회의 답변을 확인할 수 있어요.</SubText>
      </TextContainer>
      <BannerImage src={BannerImg} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 27px 0px 27px;
  gap: 30px;
  background-color: ${(props) => props.theme.colors.grayScale10};
`;

const TextContainer = styled.div`
  width: 100%;
  margin-top: 6px;
`;

const TitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale80};
`;

const SubText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale50};
  margin-top: 4px;
`;

const BannerImage = styled.img``;
