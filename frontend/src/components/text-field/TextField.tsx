import styled from 'styled-components';
import { BorderProps } from '../border/BorderProps';
import Typography from '../../styles/Typography';
import { getBorderStyle, getDefaultBorderStyle } from '../border/getBorderType';

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
