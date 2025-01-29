import styled from 'styled-components';
import { BorderProps } from '../BorderProps';
import Typography from '../../styles/Typography';

interface CountTextFieldProps {
  value: string;
  maxLength: number;
  placeholder?: string;
  onChange: (value: string) => void;
  placeholderColor?: string;
  textColor?: string;
  border?: BorderProps;
}

export const CountTextField: React.FC<CountTextFieldProps> = ({
  value,
  maxLength,
  placeholder,
  onChange,
  placeholderColor = '#A8A8A8',
  textColor = '#222222',
  border,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (newValue.length >= maxLength) {
      newValue = newValue.slice(0, maxLength);
    }
    onChange(newValue);
  };

  return (
    <CountTextFieldContainer>
      <TextFieldInput
        variant = "body1"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        placeholderColor={placeholderColor}
        textColor={textColor}
        border={border}
      />
      <CountText variant = "caption2">
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

const TextFieldInput =  styled(Typography).attrs({ as: 'input' })<{
  placeholderColor: string;
  textColor: string;
  border?: BorderProps;
}>`
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  color: ${(props) => props.textColor};
  border: ${(props) =>
    `${props.border?.borderWidth || '1px'} solid ${props.border?.borderColor || '#E0E0E0'}`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  outline: none;

  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;

const CountText = styled(Typography)`
  color: #a8a8a8;
  margin-top: 6px;
`;
