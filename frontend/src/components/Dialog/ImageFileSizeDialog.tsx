import { Dialog } from './Dialog';

interface ImageFileSizeDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ImageFileSizeDialog = ({
  onConfirm = () => {},
  onDismiss = () => {},
}: ImageFileSizeDialogProps) => {
  return (
    <Dialog
      body="10MB 이하의 이미지만 업로드할 수 있습니다."
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      confirmButton={{
        text: '확인',
        children: '확인',
        backgroundColor: '#1F87FF',
        textColor: '#FFFFFF',
      }}
    />
  );
};
