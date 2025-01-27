import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import StudentApp from './domains/student/App.tsx';
import AdminApp from './domains/admin/App.tsx';

const isAdmin = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isAdmin ? <AdminApp /> : <StudentApp />}</StrictMode>,
);
