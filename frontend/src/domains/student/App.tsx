import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';

function StudentApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default StudentApp;
