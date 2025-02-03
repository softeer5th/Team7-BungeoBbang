import api from '@/utils/api';

interface EmailRequest {
  email: string;
}

interface EmailVerificationRequest {
  email: string;
  code: string;
}

interface EmailResponse {
  status?: number;
  message?: string;
}

interface ApiError {
  response?: {
    data: {
      message: string;
    };
  };
}

export const sendEmailVerification = async (email: string): Promise<EmailResponse> => {
  try {
    const requestBody: EmailRequest = { email: email };
    const response = await api.post('/student/auth/email', requestBody);
    return response.status;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data?.message || '인증 코드 전송에 실패하였습니다.');
  }
};

export const confirmEmailVerification = async (email: string, code: string): Promise<number> => {
  try {
    const requestBody: EmailVerificationRequest = { email: email, code: code };
    const response = await api.post('/student/auth/email/verify', requestBody);
    return response.status;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data?.message || '인증 코드 전송에 실패하였습니다.');
  }
};
