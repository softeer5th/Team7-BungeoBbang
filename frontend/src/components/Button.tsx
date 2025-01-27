import styled from 'styled-components';

interface ButtonProps {
    text: string;
    onClick: () => void;
    backgroundColor?: string;
    textColor?: string;
    border?: {
        borderWidth?: string;
        borderColor?: string;
        borderRadius?: string;
    };
    disabled: boolean
}

export const Button: React.FC<ButtonProps> = ({
    text,
    onClick = () => {},
    backgroundColor,
    textColor,
    border,
    disabled,
}) => {
    return (
        <ButtonContainer
            onClick={onClick}
            backgroundColor={backgroundColor}
            textColor={textColor}
            border={border}
            disabled={disabled}>
            {text}
        </ButtonContainer>
    );
};

const ButtonContainer = styled.div<{
    backgroundColor?: string;
    textColor?: string;
    border?: {
        borderWidth?: string;
        borderColor?: string;
        borderRadius?: string;
    };
    disabled: boolean;
}>` 
width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  font-size: 16px;
   background-color: ${(props) =>
    props.disabled
      ? '#E0E0E0' 
      : props.backgroundColor || '#1F87FF'};
  color: ${(props) =>
    props.disabled
      ? '#A8A8A8'
      : props.textColor || '#FFFFFF'};
  border: ${(props) =>
    props.border
      ?  `${props.border?.borderWidth || '1px'} solid ${
          props.border?.borderColor || '#1F87FF'}`
        :`none`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
`;

