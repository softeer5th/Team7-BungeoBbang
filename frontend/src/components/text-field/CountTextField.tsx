import styled from 'styled-components';
import { BorderProps } from '../border/BorderProps';
import Typography from '../../styles/Typography';
import { getBorderStyle, getDefaultBorderStyle } from '../border/getBorderType';

interface CountTextFieldProps {
  /**
   * 입력 필드의 현재 값
   */
  value: string;

  /**
   * 입력 가능한 최대 문자 길이
   */
  maxLength: number;

  /**
   * 입력 필드의 placeholder 텍스트
   * @default ""
   * @example "내용을 입력하세요..."
   */
  placeholder?: string;

  /**
   * 입력 필드의 줄(row) 개수
   * @default 1
   */
  rows?: number;

  /**
   * 입력값이 변경될 때 호출되는 콜백 함수
   * @param value 변경된 입력 값
   */
  onChange: (value: string) => void;

  /**
   * placeholder 텍스트 색상
   * @example "#A8A8A8"
   */
  placeholderColor?: string;

  /**
   * 입력 필드의 텍스트 색상
   * @example "#262626"
   */
  textColor?: string;

  /**
   * 입력 필드의 테두리 스타일 (BorderProps 사용)
   */
  border?: BorderProps;

  /**
   * 입력 필드를 비활성화할지 여부
   * @default false
   */
  disabled?: boolean;
}

export const CountTextField: React.FC<CountTextFieldProps> = ({
  value,
  maxLength,
  placeholder,
  rows = 1,
  onChange,
  placeholderColor = '#A8A8A8',
  textColor = '#262626',
  border = {
    ...getDefaultBorderStyle(),
    borderColor: '#E0E0E0',
    disabledBorderColor: 'E0E0E0',
    borderRadius: '12px',
  },
  disabled = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;
    if (newValue.length >= maxLength) {
      newValue = newValue.slice(0, maxLength);
    }
    onChange(newValue);
  };

  return (
    <CountTextFieldContainer>
      <TextFieldInput
        rows={rows}
        variant="body1"
        value={disabled ? '' : value}
        placeholder={placeholder}
        onChange={handleInputChange}
        placeholderColor={placeholderColor}
        textColor={textColor}
        border={border}
        disabled={disabled}
      />
      <CountText variant="caption2">
        {value.length}/{maxLength}
      </CountText>
    </CountTextFieldContainer>
  );
};

const CountTextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const TextFieldInput = styled(Typography).attrs({ as: 'textarea' })<{
  placeholderColor: string;
  textColor: string;
  border?: BorderProps;
  disabled: boolean;
}>`
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  background-color: ${(props) => (props.disabled ? '#E0E0E0' : '#FFFFFF')};
  color: ${(props) => (props.disabled ? '#C6C6C6' : props.textColor)};
  ${(props) =>
    props.border
      ? getBorderStyle({
          ...props.border,
          borderColor: props.disabled ? props.border.disabledBorderColor : props.border.borderColor,
        })
      : 'border: none;'}

  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;

const CountText = styled(Typography)`
  color: #a8a8a8;
  margin-top: 6px;
`;
