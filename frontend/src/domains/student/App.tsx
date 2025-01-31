import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import OAuthCallback from './pages/oauth/callback';
import EmailVerification from './pages/login/emailcheck';
import UniversitySelection from './pages/login/univcheck';

function StudentApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/kakao/redirect" element={<OAuthCallback />} />
        <Route path="/google/redirect" element={<OAuthCallback />} />
        <Route path="/email" element={<EmailVerification />} />
        <Route path="/univ" element={<UniversitySelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default StudentApp;
