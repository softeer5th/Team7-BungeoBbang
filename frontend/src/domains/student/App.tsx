import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import OAuthCallback from './pages/oauth/callback';
import EmailVerification from './pages/login/emailcheck';

function StudentApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<OAuthCallback />} />
        <Route path="/oauth/callback/google" element={<OAuthCallback />} />
        <Route path="/email" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default StudentApp;
