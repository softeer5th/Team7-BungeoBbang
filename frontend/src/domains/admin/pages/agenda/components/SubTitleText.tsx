import Typography from '@/styles/Typography';
import styled from 'styled-components';

interface SubTitleTextProps {
  text: string;
}

export const SubTitleText = ({ text }: SubTitleTextProps) => {
  return (
    <TextContainer>
      <Text variant="heading5">{text}</Text>
      <RequiredIcon variant="body2">*</RequiredIcon>
    </TextContainer>
  );
};

const TextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
  margin-bottom: 8px;
`;

const Text = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale90};
`;

const RequiredIcon = styled(Typography)`
  color: ${(props) => props.theme.colors.sementicMain};
`;
