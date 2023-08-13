import styled from 'styled-components'
import {
  Input as UiInput,
  Form as UiForm,
  Button,
} from 'antd';

export const Form = styled(UiForm)``;

export const FormItem = styled(UiForm.Item)`
  margin-bottom: 24px;
`;

export const Input = styled(UiInput)``;

export const TextArea = styled(UiInput.TextArea)``;

export const LetterContentHolder = styled.pre`
white-space: pre-wrap;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
word-break: break-all;
font-size: 10px;
background-color: whitesmoke;
`;

export const MainContainer = styled.div`
display: flex;
padding: 33px;
justify-content: space-between;
align-items: flex-start;
// background: yellowgreen;
    height: 80vh;
    gap: 80px;

`;

export const SendLetterButton = styled(Button)``;

export const FormContainer = styled.div`
width: 50%;
`;

export const LetterContentContainer = styled.div`
width: 50%;
`;

export const UserMessage = styled.div`
  margin-bottom: 24px;
`;