import api from '@/utils/api';

interface EmailVerificationResponse {
  success: boolean;
  message: string;
}

export const authService = {
  // 이메일 인증 요청
  sendVerificationEmail: async (email: string) => {
    try {
      const response = await api.post<EmailVerificationResponse>('/student/auth/email', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 이메일 인증 확인
  verifyEmail: async (code: string) => {
    try {
      const response = await api.post<EmailVerificationResponse>('/student/auth/email/verify', {
        code,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
