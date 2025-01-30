import React, { useState } from 'react';
import styled from 'styled-components';
import { authService } from './auth';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const SubTitle = styled.p`
  color: #666;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setLoading(true);
    try {
      await authService.sendVerificationEmail(email);
      // 성공 처리 로직 (예: 다음 단계로 이동)
    } catch (error) {
      // 에러 처리 로직
      console.error('이메일 인증 요청 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>학교 이메일을 입력해주세요.</Title>
      <SubTitle>재학중인 학교 이메일을 입력해주세요.</SubTitle>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={!email || loading}>
        {loading ? '처리중...' : '인증 메일 보내기'}
      </Button>
    </Container>
  );
};

export default EmailVerification;
