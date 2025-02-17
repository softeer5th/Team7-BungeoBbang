import Typography from '@/styles/Typography';
import styled from 'styled-components';
import messageIcon from '@/assets/imgs/message.png';

interface EmptyContentProps {
  showIcon?: boolean;
  text: string;
}

export const EmptyContent = ({ showIcon = true, text }: EmptyContentProps) => {
  return (
    <Container>
      {showIcon && <Icon src={messageIcon} />}
      <Text variant="heading4">{text}</Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;

const Text = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale40};
  text-align: center;
  white-space: pre-line;
`;
