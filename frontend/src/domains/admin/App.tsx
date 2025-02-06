import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/login';
import OpinionEntryPage from './pages/opinion/entry';

function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/opinion/entry" element={<OpinionEntryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
