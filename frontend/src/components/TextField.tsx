import React, { useState } from 'react';
import styled from 'styled-components';

interface TextFieldProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  placeholderColor?: string;
  color?: string;
  border?: {
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    errorBorderColor?: string;
  };
  errorText?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  placeholder = '',
  onChange,
  placeholderColor,
  color,
  border,
  errorText,
}) => {
  const [hasError, setHasError] = useState(!!errorText);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    setHasError(false);
  };

  return (
    <TextFieldContainer>
      <TextFieldInput
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        placeholderColor={placeholderColor}
        color={color}
        border={border}
        hasError={hasError}
      />
      {hasError && errorText && <ErrorText>{errorText}</ErrorText>}
    </TextFieldContainer>
  );
};


const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TextFieldInput = styled.input<{
  placeholderColor?: string;
  color?: string;
  border?: {
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    errorBorderColor?: string;
  };
  hasError: boolean;
}>`

  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  font-size: 16px;
  color: ${(props) => props.color || '#393939'};
  border: ${(props) =>
    `${props.border?.borderWidth || '1px'} solid ${
      props.hasError ? props.border?.errorBorderColor || '#FF4B4B' : props.border?.borderColor || '#E0E0E0'
    }`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  outline: none;

  &::placeholder {
    color: ${(props) => props.placeholderColor || '#A8A8A8'};
  }

`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #FF4B4B;
  margin-top: 6px;
`;
