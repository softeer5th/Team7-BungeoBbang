import styled from 'styled-components';
import { BorderProps } from '../BorderProps';
import Typography from '../../styles/Typography';

interface TextFieldProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  placeholderColor?: string;
  textColor?: string;
  border?: BorderProps;
  errorText?: string;
  errorTextColor?: string;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  placeholder = '',
  onChange,
  placeholderColor = '#A8A8A8',
  textColor = '#3C3C3C',
  border,
  errorText,
  errorTextColor = '#FF4B4B',
  disabled = false,
}) => {
  const hasError = Boolean(errorText);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <TextFieldContainer>
      <TextFieldInput
        variant="body1"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        placeholderColor={placeholderColor}
        textColor={textColor}
        border={border}
        hasError={hasError}
        disabled={disabled}
      />
      {hasError && (
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

const TextFieldInput = styled(Typography).attrs({ as: 'input' })<{
  placeholderColor: string;
  textColor: string;
  border?: BorderProps;
  hasError: boolean;
  disabled: boolean;
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
`;

const ErrorText = styled(Typography)<{
  errorTextColor: string;
}>`
  color: ${(props) => props.errorTextColor};
  margin-top: 6px;
`;
