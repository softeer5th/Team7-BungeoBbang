import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/login';

function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
