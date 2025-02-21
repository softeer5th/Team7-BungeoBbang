import { ButtonProps } from '@/components/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { useTheme } from 'styled-components';

interface ChatEnterDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ChatEnterDialog: React.FC<ChatEnterDialogProps> = ({
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  const confirmButton: ButtonProps = {
    text: '입장하기',
  };

  const dismissButton: ButtonProps = {
    text: '취소',
    backgroundColor: theme.colors.grayScale10,
    textColor: theme.colors.grayScale40,
  };

  return (
    <Dialog
      body={`채팅방에 입장하시겠어요?
      입장한 채팅방의 알림은
      <span style="color: #1F87FF; font-weight: 700; line-height:130%">[내 의견]</span>에서 확인할 수 있습니다.`}
      onConfirm={() => onConfirm()}
      onDismiss={() => onDismiss()}
      confirmButton={confirmButton}
      dissmissButton={dismissButton}
    />
  );
};
