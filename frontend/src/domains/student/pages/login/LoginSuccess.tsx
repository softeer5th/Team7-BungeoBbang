import { ChevronLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as C from './check-styles.ts';

export const Container = C.Container;
export const BackButton = C.BackButton;
export const Title = C.Title;
export const Subtitle = C.Subtitle;
export const SubmitButton = C.SubmitButton;

const LoginSuccess = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/main');
  };
  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft size={24} color="#000" />
      </BackButton>
      <TitleWrapper>
        <Icon src="/assets/icons/blue-check.svg"></Icon>
        <Title>가입 완료 됐어요</Title>
      </TitleWrapper>

      <NextButton onClick={handleNext}>문의하러 가기</NextButton>
    </Container>
  );
};
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 173px;
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
`;

const NextButton = styled.button`
  width: calc(100% - 40px);
  padding: 16px;
  background-color: #1f87ff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  margin: 20px;
  position: fixed;
  bottom: 36px;
  left: 0;
`;

export default LoginSuccess;
