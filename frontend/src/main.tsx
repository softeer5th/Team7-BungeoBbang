import { createRoot } from 'react-dom/client';
import './index.css';
import { theme } from './styles/theme.ts';
import { ThemeProvider } from 'styled-components';
import '@/styles/fonts.css';
import '@/styles/reset.css';
import StudentApp from './domains/student/App.tsx';
import AdminApp from './domains/admin/App.tsx';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('새로운 버전이 있습니다. 업데이트하시겠습니까?')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('앱이 오프라인에서도 사용할 수 있습니다.');
  },
});

const isAdmin = window.location.hostname.startsWith('admin');

const root = document.querySelector('#root');

// 터치이벤트에 passive 옵션을 false로 설정해야 e.preventDefault()가 작동합니다.
root?.addEventListener('touchmove', (e) => {
  e.preventDefault(); // 기본 스크롤 및 바운스 효과를 막음
}, { passive: false });

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>{!isAdmin ? <AdminApp /> : <StudentApp />}</ThemeProvider>,
);
