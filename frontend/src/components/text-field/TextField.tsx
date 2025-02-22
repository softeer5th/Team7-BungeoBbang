import styled from 'styled-components';
import { BorderProps } from '../border/BorderProps';
import Typography from '../../styles/Typography';
import { getBorderStyle, getDefaultBorderStyle } from '../border/getBorderType';

interface TextFieldProps {
  /**
   * 입력 필드의 값
   */
  value: string;

  /**
   * 입력 필드의 placeholder 텍스트 (선택 사항)
   * @example "이름을 입력하세요"
   */
  placeholder?: string;

  /**
   * 입력 필드의 표시할 줄 수 (선택 사항)
   * @default 1
   * @example 3
   */
  rows?: number;

  /**
   * 값이 변경될 때 호출되는 콜백 함수 (선택 사항)
   * @param value 변경된 값
   */
  onChange?: (value: string) => void;

  /**
   * 입력 필드를 클릭할 때 호출되는 콜백 함수 (선택 사항)
   */
  onClick?: () => void;

  /**
   * 입력 필드의 placeholder 색상 (선택 사항)
   * @default "#A8A8A8"
   * @example "#C6C6C6"
   */
  placeholderColor?: string;

  /**
   * 입력 필드의 텍스트 색상 (선택 사항)
   * @default "#000000"
   * @example "#FFFFFF"
   */
  textColor?: string;

  /**
   * 입력 필드의 테두리 스타일 (선택 사항)
   */
  border?: BorderProps;

  /**
   * 오류 메시지 텍스트 (선택 사항)
   * @example "비밀번호가 일치하지 않습니다."
   */
  errorText?: string;

  /**
   * 오류 메시지의 색상 (선택 사항)
   * @default "#FF0000"
   * @example "#D32F2F"
   */
  errorTextColor?: string;

  /**
   * 오류 상태 여부 (선택 사항)
   * @default false
   */
  isError?: boolean;

  /**
   * 비활성화 여부 (선택 사항)
   * @default false
   */
  disabled?: boolean;

  /**
   * 포커스 가능 여부 (선택 사항)
   * @default true
   */
  focusable?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  placeholder = '',
  rows = 1,
  onChange = () => {},
  onClick,
  placeholderColor = '#A8A8A8',
  textColor = '#262626',
  border = {
    ...getDefaultBorderStyle(),
    borderColor: '#E0E0E0',
    disabledBorderColor: 'E0E0E0',
    borderRadius: '12px',
  },
  errorText,
  errorTextColor = '#FF4B4B',
  isError = false,
  disabled = false,
  focusable = true,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <TextFieldContainer>
      <TextFieldInput
        rows={rows}
        tabIndex={focusable ? 0 : -1}
        variant="body1"
        onClick={onClick}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        placeholderColor={placeholderColor}
        textColor={textColor}
        border={border}
        hasError={isError}
        disabled={disabled}
        isFocusable={onClick ? false : true}
        readOnly={true}
      />
      {isError && errorText && (
        <ErrorText variant="caption2" errorTextColor={errorTextColor}>
          {errorText}
        </ErrorText>
      )}
    </TextFieldContainer>
  );
};

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TextFieldInput = styled(Typography).attrs({ as: 'textarea' })<{
  placeholderColor: string;
  textColor: string;
  border?: BorderProps;
  hasError: boolean;
  disabled: boolean;
  isFocusable: boolean;
}>`
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  background-color: ${(props) => (props.disabled ? '#F4F4F4' : '#FFFFFF')};
  color: ${(props) => (props.disabled ? '#C6C6C6' : props.textColor)};
  ${(props) =>
    props.border
      ? getBorderStyle({
          ...props.border,
          borderColor: props.hasError
            ? props.border.errorBorderColor
            : props.disabled
              ? props.border.disabledBorderColor
              : props.border.borderColor,
        })
      : 'border: none;'}
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${(props) => props.placeholderColor || '#A8A8A8'};
  }

  &:focus {
    caret-color: ${(props) => (props.isFocusable ? 'default' : 'transparent')};
  }
`;

const ErrorText = styled(Typography)<{
  errorTextColor: string;
}>`
  color: ${(props) => props.errorTextColor};
  margin-top: 6px;
`;
