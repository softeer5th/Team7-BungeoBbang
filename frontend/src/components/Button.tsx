import styled from 'styled-components';
import { BorderProps } from './border/BorderProps';
import Typography from '../styles/Typography';
import { getBorderStyle } from './border/getBorderType';

export interface ButtonProps {
  /**
   * 버튼에 표시될 텍스트
   */
  text: string;
  /**
   * 버튼의 배경색 (기본값: `#1F87FF`)
   * @default "#1F87FF"
   */
  backgroundColor?: string;
  /**
   * 버튼 텍스트의 색상 (기본값: `#FFFFFF`)
   * @default "#FFFFFF"
   */
  textColor?: string;
  /**
   * 버튼의 테두리 스타일 (BorderProps 사용)
   */
  border?: BorderProps;
  /**
   * 버튼 비활성화 여부 (기본값: `false`)
   * @default false
   */
  disabled?: boolean;
  /**
   * 버튼 클릭 시 호출되는 콜백 함수
   */
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick = () => {},
  backgroundColor = '#1F87FF',
  textColor = '#FFFFFF',
  border,
  disabled = false,
}) => {
  return (
    <ButtonContainer
      onClick={onClick}
      backgroundColor={backgroundColor}
      border={border}
      disabled={disabled ? true : false}
    >
      <ButtonText disabled={disabled ? true : false} variant="heading4" textColor={textColor}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div<{
  backgroundColor: string;
  border?: BorderProps;
  disabled: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${(props) => (props.disabled ? '#E0E0E0' : props.backgroundColor || '#1F87FF')};

  ${(props) =>
    props.border
      ? getBorderStyle({
          ...props.border,
          borderColor: props.disabled ? props.border.disabledBorderColor : props.border.borderColor,
        })
      : 'border: none;'}

  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const ButtonText = styled(Typography)<{
  disabled: boolean;
  textColor: string;
}>`
  color: ${(props) => (props.disabled ? '#A8A8A8' : props.textColor)};
`;
