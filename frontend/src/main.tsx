// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { theme } from './styles/theme.ts';
import { GlobalStyle } from './styles/GlobalStyles.ts';
import { ThemeProvider } from 'styled-components';
import '@/styles/fonts.css';
import '@/styles/reset.css';
import StudentApp from './domains/student/App.tsx';
import AdminApp from './domains/admin/App.tsx';

const isAdmin = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {!isAdmin ? <AdminApp /> : <StudentApp />}
  </ThemeProvider>,
);
