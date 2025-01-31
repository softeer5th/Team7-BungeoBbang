import api from '@/utils/api';

interface EmailRequest {
  email: string;
}

interface EmailVerificationRequest {
  email: string;
  code: string;
}

interface EmailResponse {
  status?: string;
  message?: string;
}

export const sendEmailVerification = async (email: string): Promise<EmailResponse> => {
  try {
    const requestBody: EmailRequest = { email: email };
    const response = await api.post('/student/auth/email', requestBody);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '인증 코드 전송에 실패하였습니다.');
  }
};

export const confirmEmailVerification = async (
  email: string,
  code: string,
): Promise<EmailResponse> => {
  try {
    const requestBody: EmailVerificationRequest = { email: email, code: code };
    const response = await api.post('/student/auth/email/verify', requestBody);
    return response.status;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || '인증 코드 확인에 실패하였습니다.');
  }
};
