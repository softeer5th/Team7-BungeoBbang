import styled from 'styled-components';
import * as C from '../check-styles.ts';

export const Container = C.Container;
export const BackButton = C.BackButton;
export const Title = C.Title;
export const Subtitle = C.Subtitle;
export const SubmitButton = C.SubmitButton;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  &::placeholder {
    color: #999;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff3b30;
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
`;
