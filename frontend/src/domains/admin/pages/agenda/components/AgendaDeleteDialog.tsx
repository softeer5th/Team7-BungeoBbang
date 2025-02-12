import { Dialog } from '@/components/Dialog/Dialog';
import { useTheme } from 'styled-components';

interface AgendaDeleteDialogProps {
  title: string | undefined;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const AgendaDeleteDialog: React.FC<AgendaDeleteDialogProps> = ({
  title,
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  return (
    <Dialog
      title={title}
      body="
           채팅방을 삭제하시나요?<br />
            삭제된 채팅방의 데이터는<br />
            영구적으로 삭제됩니다.
        "
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      confirmButton={{
        text: '삭제',
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
