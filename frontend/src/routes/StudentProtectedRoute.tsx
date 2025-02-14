// src/routes/ProtectedRoute.tsx
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSocketStore } from '@/store/socketStore';
import JWTManager from '@/utils/jwtManager';

export const ProtectedRoute = () => {
  const location = useLocation();
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    const initializeSocket = async () => {
      const accessToken = await JWTManager.getAccessToken();
      if (accessToken) {
        connect(false);
      }
    };

    initializeSocket();
    return () => {
      disconnect();
    };
  }, []);

  if (!JWTManager.getAccessToken()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
