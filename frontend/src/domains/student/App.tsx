import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/StudentProtectedRoute';
import LoginPage from './pages/login';
import OAuthCallback from './pages/oauth/callback';
import EmailVerification from './pages/login/emailcheck';
import UniversitySelection from './pages/login/univcheck';
import AgendaPage from './pages/agenda';
import MyPage from './pages/my';
import LoginSuccess from './pages/login/LoginSuccess';
import OpinionEntryPage from './pages/opinion/entry';
import OpinionCategoryPage from './pages/opinion/category';
import OpinionChatPage from './pages/opinion/chatroom';
import AgendaChatPage from './pages/agenda/chat';
import { ErrorProvider, useError } from '@/contexts/ErrorContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useEffect } from 'react';
import { setErrorHandler } from '@/utils/errorHandler';

function AppContent() {
  const { showError } = useError();

  useEffect(() => {
    setErrorHandler(showError);
  }, [showError]);

  return (
    <ErrorBoundary onError={showError}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/kakao/redirect" element={<OAuthCallback />} />
        <Route path="/google/redirect" element={<OAuthCallback />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/email" element={<EmailVerification />} />
          <Route path="/univ" element={<UniversitySelection />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/agenda/chat/:roomId" element={<AgendaChatPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/login/success" element={<LoginSuccess />} />
          <Route path="/opinion/entry" element={<OpinionEntryPage />} />
          <Route path="/opinion/category" element={<OpinionCategoryPage />} />
          <Route path="/opinion/chat/:roomId" element={<OpinionChatPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

function StudentApp() {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorProvider>
  );
}

export default StudentApp;
