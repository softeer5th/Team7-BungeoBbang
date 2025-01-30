import { useState } from 'react';
import { ChevronLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification, confirmEmailVerification } from './auth';
import * as S from './styles';

type Step = 'email' | 'verification';

export default function SchoolEmailPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const isEmailValid = email.length > 0;
  const isVerificationValid = verificationCode.length > 0;

  const handleGoBack = () => {
    if (step === 'verification') {
      setStep('email');
    } else {
      navigate(-1);
    }
  };

  const handleSubmitEmail = async () => {
    if (!isEmailValid || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const jo = await sendEmailVerification(email);
      console.log(jo);

      setStep('verification');
    } catch (err) {
      setError(err instanceof Error ? err.message : '인증 코드 전송에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isVerificationValid || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      await confirmEmailVerification(email, verificationCode);
      // 인증 성공 후 처리
      console.log('인증 성공');
    } catch (err) {
      setError(err instanceof Error ? err.message : '인증 코드 확인에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.BackButton onClick={handleGoBack}>
        <ChevronLeft size={24} color="#000" />
      </S.BackButton>

      {step === 'email' ? (
        <>
          <S.Title>학교 이메일을 입력해주세요.</S.Title>
          <S.Subtitle>재학중인 학교 이메일을 입력해주세요.</S.Subtitle>

          <S.Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <S.SubmitButton
            $isValid={isEmailValid}
            onClick={handleSubmitEmail}
            disabled={!isEmailValid || isLoading}
          >
            {isLoading ? '전송중...' : '인증 메일 보내기'}
          </S.SubmitButton>
        </>
      ) : (
        <>
          <S.Title>인증번호를 입력해주세요.</S.Title>
          <S.Subtitle>메일로 인증번호를 전달했어요.</S.Subtitle>

          <S.Input
            type="text"
            placeholder="인증번호"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />

          <S.SubmitButton
            $isValid={isVerificationValid}
            onClick={handleVerifyCode}
            disabled={!isVerificationValid || isLoading}
          >
            인증 하기
          </S.SubmitButton>
        </>
      )}

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  );
}
