import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/login';
import AgendaPage from './pages/agenda';
import AgendaChatPage from './pages/agenda/chat';

function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/agenda/chat/:roomId" element={<AgendaChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
