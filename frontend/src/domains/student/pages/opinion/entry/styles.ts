import styled from 'styled-components';

export const OpinionEntryContainer = styled.div`
  height: calc(100svh);
  background-color: #51a2ff;

  display: flex;
  flex-direction: column;
`;

export const TitleInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 92px;
  color: #fff;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7px;
`;

export const SubTitle = styled.div`
  color: var(--Default-Gray-White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 15.6px */
  letter-spacing: -0.24px;
  opacity: 0.4;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 16px;
`;

export const Input = styled.div`
  width: 100%;
  height: 92px;
  border-radius: 26px;
  box-shadow: 0px 0px 24.3px 0px rgba(0, 0, 0, 0.04);
  background: white;
  border: none;
  padding: 0 50px 0 20px;
`;

export const SendButton = styled.button`
  position: absolute;
  right: 31px;
  bottom: 16px;
  transform: translateY(-50%);
  display: flex;
  width: 30px;
  height: 30px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #1f87ff;
  border: none;
  cursor: pointer;
`;

export const StatisticWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
  gap: 15px;
  padding: 16px;
  margin-bottom: 14px;
  width: 100%;
`;

export const StatisticContainer = styled.div`
  width: 100%;
  height: 108px;
  border-radius: 16px;
  background: var(--default-color-palette-30, #84bdff);
  box-shadow: 0px 0px 24.3px 0px rgba(0, 0, 0, 0.04);
  padding: 11px 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StatLabel = styled.div`
  color: var(--default-color-palette-10, #e8f3ff);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.24px;
`;

export const StatValue = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

export const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 25px;
    margin-bottom: 25px;
    width: 101px;
    height: 101px;
    flex-shrink: 0;
  }
`;
