import { Dialog } from '@/components/Dialog/Dialog';
import { useTheme } from 'styled-components';

interface AgendaEndDialogProps {
  title: string | undefined;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const AgendaEndDialog: React.FC<AgendaEndDialogProps> = ({
  title,
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  return (
    <Dialog
      title={title}
      body="
           채팅방을 종료하시나요?<br />
            종료된 채팅방은 종료 페이지로 이동되며,<br />
            다시 개설되지 않습니다.
        "
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      confirmButton={{
        text: '종료',
        backgroundColor: theme.colors.sementicError,
      }}
      dissmissButton={{
        text: '취소',
        backgroundColor: theme.colors.grayScale10,
        textColor: theme.colors.grayScale40,
      }}
    />
  );
};
