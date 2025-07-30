import { backendAPI } from '@/api/backendAPI';
import type { User } from '../interfaces/user.interface';
import type { AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';

interface CheckTokenError {
  ok: false;
  message: string;
}

interface CheckTokenSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckTokenError | CheckTokenSuccess> => {
  try {
    const token = localStorage.getItem('token');

    if (!token || token.length < 10) {
      return {
        ok: false,
        message: 'Token not found!',
      };
    }

    const { data } = await backendAPI.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Failed status token check',
      };
    }
    throw new Error('Failed to check token status');
  }
};
