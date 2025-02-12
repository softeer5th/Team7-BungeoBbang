import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/login';
import AgendaPage from './pages/agenda';
import AgendaChatPage from './pages/agenda/chat';
import OpinionEntryPage from './pages/opinion/entry';
import CreateAgendaPage from './pages/agenda/create';
import OpinionChatPage from './pages/opinion/chatroom';
import { AdminProtectedRoute } from '@/routes/AdminProtectedRoute';

function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/agenda/create/:roomId" element={<CreateAgendaPage />} />
          <Route path="/agenda/chat/:roomId" element={<AgendaChatPage />} />
          <Route path="/opinion/entry" element={<OpinionEntryPage />} />
          <Route path="/opinion/chat/:roomId" element={<OpinionChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
