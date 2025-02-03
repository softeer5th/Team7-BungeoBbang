import { useState } from 'react';
import { ChevronLeft } from 'react-feather';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendEmailVerification, confirmEmailVerification } from './auth';
import * as S from './styles';
import api from '@/utils/api';
import JWTManager from '@/utils/jwtManager';
import { Dialog } from '@/components/Dialog';

type Step = 'email' | 'verification';

export default function SchoolEmailPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const university = location.state?.university;

  const isEmailValid = email.length > 0;
  const isVerificationValid = verificationCode.length > 0;

  const handleGoBack = () => {
    step === 'verification' ? setStep('email') : navigate(-1);
  };

  const handleSubmitEmail = async () => {
    if (!isEmailValid || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const isEmailOkay = await sendEmailVerification(email);
      isEmailOkay === 200 ? setStep('verification') : setShowDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '인증 코드 전송에 실패하였습니다.');
      setShowDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isVerificationValid || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const isConfirmed = await confirmEmailVerification(email, verificationCode);
      Number(isConfirmed) === 200 ? await patchUniversity(email) : setShowDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '인증 코드 확인에 실패하였습니다.');
      setShowDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const patchUniversity = async (email: string) => {
    if (!university) {
      return;
    }

    const memberId = await JWTManager.getMemberId();

    try {
      await api.patch('/student/auth/university', {
        memberId: memberId,
        universityId: university.id,
        email: email,
      });
      // navigate('/main');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '학교 정보 저장에 실패하였습니다. <br /> 다시 시도해주세요.',
      );
    }
  };

  return (
    <S.Container>
      {showDialog && (
        <Dialog
          body={
            step === 'email'
              ? '대학교 이메일이 일치하지 않습니다.'
              : '인증번호가 일치하지 않습니다.'
          }
          onConfirm={() => setShowDialog(false)}
          onDismiss={() => setShowDialog(false)}
          confirmButton={{ text: '확인', backgroundColor: '#1F87FF' }}
        />
      )}
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
