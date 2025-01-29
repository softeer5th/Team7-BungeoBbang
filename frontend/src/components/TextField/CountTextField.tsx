import styled from 'styled-components';
import { BorderProps } from '../BorderProps';

interface CountTextFieldProps {
  value: string;
  maxLength: number;
  placeholder?: string;
  onChange: (value: string) => void;
  placeholderColor?: string;
  color?: string;
  border?: BorderProps;
}

export const CountTextField: React.FC<CountTextFieldProps> = ({
  value,
  maxLength,
  placeholder = '',
  onChange,
  placeholderColor,
  color,
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
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        placeholderColor={placeholderColor}
        color={color}
        border={border}
      />
      <CountText>
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

const TextFieldInput = styled.input<{
  placeholderColor?: string;
  color?: string;
  border?: BorderProps;
}>`
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  font-size: 16px;
  color: ${(props) => props.color || '#393939'};
  border: ${(props) =>
    `${props.border?.borderWidth || '1px'} solid ${props.border?.borderColor || '#E0E0E0'}`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  outline: none;

  &::placeholder {
    color: ${(props) => props.placeholderColor || '#A8A8A8'};
  }
`;

const CountText = styled.span`
  font-size: 12px;
  line-height: 130%;
  color: #a8a8a8;
  margin-top: 6px;
`;
