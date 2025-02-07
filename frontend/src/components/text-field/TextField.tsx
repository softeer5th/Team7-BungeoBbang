import styled from 'styled-components';
import { BorderProps } from '../BorderProps';
import Typography from '../../styles/Typography';

interface TextFieldProps {
  value: string;
  placeholder?: string;
  rows?: number;
  onChange?: (value: string) => void;
  onClick?: () => void;
  placeholderColor?: string;
  textColor?: string;
  border?: BorderProps;
  errorText?: string;
  errorTextColor?: string;
  isError?: boolean;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  placeholder = '',
  rows = 1,
  onChange = () => {},
  onClick,
  placeholderColor = '#A8A8A8',
  textColor = '#3C3C3C',
  border,
  errorText,
  errorTextColor = '#FF4B4B',
  isError = false,
  disabled = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <TextFieldContainer>
      <TextFieldInput
        rows={rows}
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
  background-color: ${(props) => (props.disabled ? '#E0E0E0' : '#FFFFFF')};
  color: ${(props) => (props.disabled ? '#C6C6C6' : props.textColor)};
  border: ${(props) =>
    `${props.border?.borderWidth || '1px'} solid ${
      props.hasError
        ? props.border?.errorBorderColor || '#FF4B4B'
        : props.border?.borderColor || '#E0E0E0'
    }`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  outline: none;

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
