import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/login';
import AgendaPage from './pages/agenda';
import AgendaChatPage from './pages/agenda/chat';
import OpinionEntryPage from './pages/opinion/entry';
import { useSocketStore } from '@/store/socketStore';
import { useEffect } from 'react';
import CreateAgendaPage from './pages/agenda/create';
import OpinionChatPage from './pages/opinion/chatroom';

function AdminApp() {
  const { connect, disconnect } = useSocketStore();
  useEffect(() => {
    connect(true);
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/agenda/create/:roomId?" element={<CreateAgendaPage />} />
        <Route path="/agenda/chat/:roomId" element={<AgendaChatPage />} />
        <Route path="/opinion/entry" element={<OpinionEntryPage />} />
        <Route path="/opinion/chat/:roomId" element={<OpinionChatPage />} />
        {/* <Route path="/statistics" element={<StatisticsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
