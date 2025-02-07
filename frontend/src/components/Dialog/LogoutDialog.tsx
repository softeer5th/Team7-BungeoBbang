import { useTheme } from 'styled-components';
import { Dialog } from './Dialog';
import JWTmanager from '@/utils/jwtManager';

interface LogoutDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  return (
    <Dialog
      body="로그아웃 하시겠어요?"
      onConfirm={() => {
        onConfirm();
        JWTmanager.clearTokens();
        window.location.href = '/';
      }}
      onDismiss={onDismiss}
      confirmButton={{
        text: '로그아웃',
      }}
      dissmissButton={{
        text: '취소',
        backgroundColor: theme.colors.grayScale10,
        textColor: theme.colors.grayScale40,
      }}
    />
  );
};
