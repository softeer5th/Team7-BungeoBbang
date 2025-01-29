import { createGlobalStyle } from 'styled-components';
import PretentardBold from './font/Pretendard-Bold.woff';
import PretendardSemiBold from './font/Pretendard-SemiBold.woff';
import PretendardMedium from './font/Pretendard-Medium.woff';

export const GlobalStyle = createGlobalStyle`

 @font-face {
  font-family: 'Pretendard-Bold';
  src: local('Pretendard-Bold'), url(${PretentardBold}) format('woff');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Pretendard-SemiBold';
  font-weight: 600;
  src: local('Pretendard-SemiBold'), url(${PretendardSemiBold}) format('woff');
}

@font-face {
    font-family: 'Pretendard-Medium';
  font-weight: 500;
    src: local('Pretendard-Medium'), url(${PretendardMedium}) format('woff');
    font-weight: normal;
  }

`;
