import { Dialog } from '@/components/Dialog/Dialog';
import { useTheme } from 'styled-components';

interface ExitDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ExitDialog: React.FC<ExitDialogProps> = ({
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  return (
    <Dialog
      body="정말로 나가시겠습니까?"
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      confirmButton={{
        text: '나가기',
        backgroundColor: theme.colors.sementicError,
        textColor: theme.colors.grayScaleWhite,
      }}
      dissmissButton={{
        text: '취소',
        backgroundColor: theme.colors.grayScale10,
        textColor: theme.colors.grayScale40,
      }}
    />
  );
};
