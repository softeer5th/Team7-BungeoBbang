import { AxiosError } from 'axios';
import { ApiError } from '@/types/error';
import JWTManager from './jwtManager';

let globalShowError: ((error: ApiError) => void) | null = null;

export const setErrorHandler = (showError: (error: ApiError) => void) => {
  globalShowError = showError;
};

export const handleApiError = async (error: AxiosError): Promise<never> => {
  if (!error.response) {
    const apiError = new ApiError(500, '네트워크 오류가 발생했습니다.');
    globalShowError?.(apiError);
    throw apiError;
  }

  const { status } = error.response;
  const errorData = error.response.data as { message?: string };
  let apiError: ApiError;
  let redirect = false;

  switch (status) {
    case 400:
      apiError = new ApiError(400, errorData.message || `잘못된 요청입니다.`);
      break;

    case 401:
      apiError = new ApiError(401, `인증이 필요합니다. \n 다시 로그인 해주세요`);
      redirect = true;
      break;

    case 403:
      await JWTManager.clearTokens();
      apiError = new ApiError(403, `접근 권한이 없습니다. \n 다시 로그인 해주세요`);
      redirect = true;
      break;

    case 404:
      apiError = new ApiError(404, `요청한 리소스를 찾을 수 없습니다.`);
      break;

    case 409:
      await JWTManager.clearTokens();
      apiError = new ApiError(409, `다른 기기에서 로그인되었습니다. \n 다시 로그인 해주세요`);
      redirect = true;
      break;

    case 500:
      apiError = new ApiError(500, `서버 오류가 발생했습니다.`);
      break;

    default:
      apiError = new ApiError(status, `알 수 없는 오류가 발생했습니다. \n 다시 로그인 해주세요`);
      redirect = true;
  }

  if (redirect) {
    setTimeout(() => {
      JWTManager.clearTokens();
      window.location.href = '/';
    }, 1400);
  }

  globalShowError?.(apiError);
  throw apiError;
};
