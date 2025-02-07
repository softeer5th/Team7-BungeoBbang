import Typography from '@/styles/Typography';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  min-height: 100dvh;
  max-height: 100dvh;
  overflow: auto;
`;

export const TopAppBar = styled.div`
  width: 100%;
  padding: 14px 16px 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayScale10};
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: aboslute;
  top: 0;
  left: 0;
`;

export const TitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale90};
`;

export const RegisterTextButton = styled(Typography)<{
  textColor: string;
}>`
  color: ${(props) => props.textColor};
  white-space: nowrap;
`;

export const BodyContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 12px 16px 48px 16px;
`;

export const TitleContainer = styled.div`
  margin-bottom: 8px;
`;

export const CategoryContainer = styled.div`
  margin-bottom: 30px;
`;

export const DurationContainer = styled.div`
  margin-bottom: 30px;
`;

export const InfoTextContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 6px;
`;

export const InfoText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale60};
`;

export const DescriptionContainer = styled.div`
  margin-bottom: 30px;
`;

export const ImageList = styled.div`
  display: flex;
  gap: 8px;
`;

export const ImageAddContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid ${(props) => props.theme.colors.grayScale20};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  position: relative;
`;

export const CountTextContainer = styled.div`
  display: flex;
`;

export const CurrentImageCountText = styled(Typography)<{
  textColor: number;
}>`
  color: ${(props) => props.textColor};
`;

export const TotalImageCountText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale40};
`;

export const HiddenFileInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

export const ImageItem = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

export const DeleteIconBox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.grayScale100};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -3px;
  top: -3px;
`;

export const ImageBox = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border: 1px solid ${(props) => props.theme.colors.grayScale20};
  border-radius: 12px;
`;
