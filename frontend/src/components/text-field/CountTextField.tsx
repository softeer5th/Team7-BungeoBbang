import styled from 'styled-components';
import { BorderProps } from '../border/BorderProps';
import Typography from '../../styles/Typography';
import { getBorderStyle, getDefaultBorderStyle } from '../border/getBorderType';

interface CountTextFieldProps {
  value: string;
  maxLength: number;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
  placeholderColor?: string;
  textColor?: string;
  border?: BorderProps;
  disabled?: boolean;
}

const CountTextField: React.FC<CountTextFieldProps> = ({
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

export default CountTextField;

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
