import { Dialog } from '@/components/Dialog';
import { useNavigate } from 'react-router-dom';
import JWTmanager from '@/utils/jwtManager';

interface LogoutProps {
  onClose: () => void;
}

export const Logout: React.FC<LogoutProps> = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      body="로그아웃 하시겠어요?"
      onConfirm={() => {
        onClose();
        JWTmanager.clearTokens();
        navigate('/');
      }}
      onDismiss={onClose}
      confirmButton={{
        text: '로그아웃',
      }}
      dissmissButton={{
        text: '취소',
        backgroundColor: '#F4F4F4',
        textColor: '#a8a8a8',
      }}
    />
  );
};
export default Logout;
