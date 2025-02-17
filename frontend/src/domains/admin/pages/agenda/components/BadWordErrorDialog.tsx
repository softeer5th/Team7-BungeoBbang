import { Dialog } from '@/components/Dialog/Dialog';
import { useTheme } from 'styled-components';

interface BadWordErrorDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export const BadWordErrorDialog: React.FC<BadWordErrorDialogProps> = ({
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  return (
    <Dialog
      body="
          금칙어가 발견되었습니다.<br/>
          더 나은 학교를 위해<br/>
          금칙어는 자제해주세요<br/>
        "
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      confirmButton={{
        text: '확인',
        backgroundColor: theme.colors.sementicMain,
      }}
    />
  );
};
