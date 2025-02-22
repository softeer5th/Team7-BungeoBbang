import styled from 'styled-components';
import { BorderProps } from '../border/BorderProps';
import { getBorderStyle } from '../border/getBorderType';
import Typography from '@/styles/Typography';
import { Button, ButtonProps } from '../Button';
import parse from 'html-react-parser';

interface DialogContainerProps {
  /**
   * 다이얼로그의 제목 (선택 사항)
   * @default ""
   * @example "알림"
   */
  title?: string;

  /**
   * 다이얼로그 본문의 내용 (HTML 태그를 포함 가능)
   * @example "채팅방에 입장하시겠어요?"
   */
  body: string;

  /**
   * 확인 버튼 클릭 시 호출되는 콜백 함수
   */
  onConfirm: () => void;

  /**
   * 취소 버튼 클릭 시 호출되는 콜백 함수
   */
  onDismiss: () => void;

  /**
   * 다이얼로그 전체 배경 색상
   * @example "#FFFFFF"
   */
  backgroundColor?: string;

  /**
   * 다이얼로그 제목 영역의 배경 색상
   * @example "#F4F4F4"
   */
  titleBackgroundColor?: string;

  /**
   * 다이얼로그 제목 텍스트 색상
   * @example "#1F87FF"
   */
  titleTextColor?: string;

  /**
   * 다이얼로그 본문 텍스트 색상
   * @example "#393939"
   */
  bodyTextColor?: string;

  /**
   * 확인 버튼의 스타일과 동작을 정의하는 `ButtonProps`
   */
  confirmButton: ButtonProps;

  /**
   * 취소 버튼의 스타일과 동작을 정의하는 `ButtonProps` (선택 사항)
   */
  dissmissButton?: ButtonProps;

  /**
   * 다이얼로그의 테두리 스타일 (`BorderProps` 사용)
   */
  border?: BorderProps;
}

export const DialogContainer: React.FC<DialogContainerProps> = ({
  title,
  body = '',
  onConfirm = () => {},
  onDismiss = () => {},
  backgroundColor = '#FFFFFF',
  titleBackgroundColor = '#F4F4F4',
  titleTextColor = '#393939',
  bodyTextColor = '#525252',
  confirmButton,
  dissmissButton,
  border,
}) => {
  return (
    <DialogBox backgroundColor={backgroundColor} border={border}>
      {title && (
        <TitleContainer titleBackgroundColor={titleBackgroundColor}>
          <TitleText variant="body2" titleTextColor={titleTextColor}>
            {title}
          </TitleText>
        </TitleContainer>
      )}
      <BodyText variant="body1" bodyTextColor={bodyTextColor}>
        {parse(body)}
      </BodyText>
      <ButtonContainer>
        {dissmissButton && (
          <Button {...dissmissButton} onClick={() => onDismiss()}>
            {dissmissButton?.text}
          </Button>
        )}
        <Button {...confirmButton} onClick={() => onConfirm()}>
          {confirmButton?.text}
        </Button>
      </ButtonContainer>
    </DialogBox>
  );
};

const DialogBox = styled.div<{
  backgroundColor: string;
  border?: BorderProps;
}>`
  position: fixed;
  top: 214px;
  padding: 24px 12px 12px 12px;
  width: 90%;
  max-width: 324px;
  background-color: ${(props) => props.backgroundColor};
  ${(props) => (props.border ? getBorderStyle(props.border) : 'border: none;')}
  border-radius: ${(props) => props.border?.borderRadius || '14px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div<{
  titleBackgroundColor: string;
}>`
  width: 100%;
  padding: 9px 22px 9px 22px;
  margin-bottom: 18px;
  box-sizing: border-box;
  background-color: ${(props) => props.titleBackgroundColor};
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled(Typography)<{
  titleTextColor: string;
}>`
  color: ${(props) => props.titleTextColor};
`;

const BodyText = styled(Typography)<{
  bodyTextColor: string;
}>`
  color: ${(props) => props.bodyTextColor};
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;
