import { Dialog } from '@/components/Dialog/Dialog';
import { useTheme } from 'styled-components';

interface SameDateErrorDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export const SameDateErrorDialog: React.FC<SameDateErrorDialogProps> = ({
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  return (
    <Dialog
      body="시작 날짜와 종료 날짜는 동일할 수 없습니다."
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      confirmButton={{
        text: '확인',
        backgroundColor: theme.colors.sementicMain,
      }}
    />
  );
};
