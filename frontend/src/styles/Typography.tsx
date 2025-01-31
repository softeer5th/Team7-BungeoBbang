import styled from 'styled-components';

const typographyStyles = {
  display1: {
    fontSize: '26px',
    fontFamily: 'Pretendard',
    fontWeight: 700,
    lineHeight: '150%',
    letterSpacing: '-0.02em',
  },
  display2: {
    fontSize: '24px',
    fontFamily: 'Pretendard',
    fontWeight: 700,
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  heading1: {
    fontSize: '20px',
    fontFamily: 'Pretendard',
    fontWeight: 700,
    lineHeight: '150%',
    letterSpacing: '-0.02em',
  },
  heading2: {
    fontSize: '18px',
    fontFamily: 'Pretendard',
    fontWeight: 700,
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  heading3: {
    fontSize: '16px',
    fontFamily: 'Pretendard',
    fontWeight: 700,
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  heading4: {
    fontSize: '16px',
    fontFamily: 'Pretendard',
    fontWeight: 600,
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  heading5: {
    fontSize: '14px',
    fontFamily: 'Pretendard',
    fontWeight: 700,
    lineHeight: '150%',
    letterSpacing: '-0.02em',
  },
  body1: {
    fontSize: '16px',
    fontFamily: 'Pretendard',
    fontWeight: 500,
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  body2: {
    fontSize: '14px',
    fontFamily: 'Pretendard',
    fontWeight: 600,
    lineHeight: '150%',
    letterSpacing: '-0.02em',
  },
  body3: {
    fontSize: '14px',
    fontFamily: 'Pretendard',
    fontWeight: 500,
    lineHeight: '150%',
    letterSpacing: '-0.02em',
  },
  body4: {
    fontSize: '12px',
    fontFamily: 'Pretendard',
    fontWeight: 600,
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  caption1: {
    fontSize: '12px',
    fontFamily: 'Pretendard',
    fontWeight: 600,
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  caption2: {
    fontSize: '12px',
    fontFamily: 'Pretendard',
    fontWeight: 500,
    lineHeight: '150%',
    letterSpacing: '-0.02em',
  },
  caption3: {
    fontSize: '10px',
    fontFamily: 'Pretendard',
    fontWeight: 500,
    lineHeight: '150%',
    letterSpacing: '-0.02em',
  },
};

const Typography = styled.p<{ variant: keyof typeof typographyStyles }>`
  margin: 0;
  padding: 0;
  font-size: ${(props) => typographyStyles[props.variant].fontSize};
  font-family: ${(props) => typographyStyles[props.variant].fontFamily};
  font-weight: ${(props) => typographyStyles[props.variant].fontWeight};
  line-height: ${(props) => typographyStyles[props.variant].lineHeight};
  letter-spacing: ${(props) => typographyStyles[props.variant].letterSpacing};
`;

export default Typography;
