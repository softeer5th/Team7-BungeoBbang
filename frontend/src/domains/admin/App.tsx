import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/login';
import AgendaPage from './pages/agenda';
import AgendaChatPage from './pages/agenda/chat';
import OpinionEntryPage from './pages/opinion/entry';
import CreateAgendaPage from '../student/pages/agenda/create';

function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/agenda/create" element={<CreateAgendaPage />} />
        <Route path="/agenda/chat/:roomId" element={<AgendaChatPage />} />
        <Route path="/opinion/entry" element={<OpinionEntryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
