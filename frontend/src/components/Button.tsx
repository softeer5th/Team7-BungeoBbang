import styled from 'styled-components';
import { BorderProps } from './BorderProps';
import Typography from '../styles/Typography';

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  children?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  border?: BorderProps;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick = () => {},
  backgroundColor = '#1F87FF',
  textColor = '#FFFFFF',
  border,
  disabled = false,
}) => {
  return (
    <ButtonContainer
      onClick={onClick}
      backgroundColor={backgroundColor}
      border={border}
      disabled={disabled ? true : false}
    >
      <ButtonText disabled={disabled ? true : false} variant="heading4" textColor={textColor}>
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div<{
  backgroundColor: string;
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
  box-sizing: border-box;
  background-color: ${(props) => (props.disabled ? '#E0E0E0' : props.backgroundColor || '#1F87FF')};
  border: ${(props) =>
    props.border
      ? `${props.border?.borderWidth || '1px'} solid ${props.border?.borderColor || '#1F87FF'}`
      : `none`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const ButtonText = styled(Typography)<{
  disabled: boolean;
  textColor: string;
}>`
  color: ${(props) => (props.disabled ? '#A8A8A8' : props.textColor)};
`;
