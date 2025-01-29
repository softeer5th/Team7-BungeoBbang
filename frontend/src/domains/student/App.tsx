import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import OAuthCallback from './pages/oauth/callback';

function StudentApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<OAuthCallback />} />
        <Route path="/oauth/callback/google" element={<OAuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default StudentApp;
