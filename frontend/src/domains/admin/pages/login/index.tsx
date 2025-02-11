import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import api from '@/utils/api';
import JWTManager from '@/utils/jwtManager';
import OnuLogo from '@/assets/icons/logo.svg?react';

interface FormState {
  loginId: string;
  password: string;
}

interface FormError {
  loginId?: string;
  password?: string;
  general?: string;
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    loginId: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormError>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    if (!form.loginId) {
      newErrors.loginId = '아이디를 입력해주세요.';
    }

    if (!form.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 에러 메시지 초기화
    if (errors[name as keyof FormError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await api.post('/admin/auth/login', form);
      console.log('Login response:', response);
      const accessToken = response.headers['access-token'];
      const refreshToken = response.headers['refresh-token'];
      await JWTManager.setTokens(refreshToken, accessToken, -1);

      navigate('/opinion/entry');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: '아이디 또는 비밀번호가 올바르지 않습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.LogoContainer>
        <S.Logo />
        <S.AdminText>ADMIN</S.AdminText>
      </S.LogoContainer>

      <S.Form onSubmit={handleSubmit}>
        <S.InputContainer>
          <S.Input
            type="text"
            name="loginId"
            placeholder="아이디"
            value={form.loginId}
            onChange={handleChange}
            error={Boolean(errors.loginId || errors.general)}
          />
          {errors.loginId && <S.ErrorText>{errors.loginId}</S.ErrorText>}
        </S.InputContainer>

        <S.InputContainer>
          <S.Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            error={Boolean(errors.loginId || errors.general)}
          />
          {errors.password && <S.ErrorText>{errors.password}</S.ErrorText>}
        </S.InputContainer>

        {errors.general && <S.ErrorText>{errors.general}</S.ErrorText>}

        <S.LoginButton type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </S.LoginButton>
      </S.Form>
      <S.OnuLogoWrapper>
        <OnuLogo width="75px" height="22px" fill="rgba(31, 135, 255, 1)" />
      </S.OnuLogoWrapper>
    </S.Container>
  );
};

export default AdminLogin;
