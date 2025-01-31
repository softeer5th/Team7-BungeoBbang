import styled from 'styled-components';
import Typography from '../../styles/Typography';

interface TextBadgeProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const TextBadge: React.FC<TextBadgeProps> = ({
  text,
  backgroundColor = '#E8F3FF',
  textColor = '#1F87FF',
}) => {
  return (
    <TextBadgeContainer backgroundColor={backgroundColor}>
      <Text variant="caption2" textColor={textColor}>
        {text}
      </Text>
    </TextBadgeContainer>
  );
};

const TextBadgeContainer = styled.div<{
  backgroundColor: string;
}>`
  width: fit-content;
  padding: 6px 21px 6px 21px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled(Typography)<{
  textColor: string;
}>`
  color: ${(props) => props.textColor};
`;
