// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/fonts.css';
import '@/styles/reset.css';
import StudentApp from './domains/student/App.tsx';
import AdminApp from './domains/admin/App.tsx';

const isAdmin = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(isAdmin ? <AdminApp /> : <StudentApp />);
