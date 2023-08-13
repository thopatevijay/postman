import React from 'react'
import { Button, Form, Space } from 'antd';
import { useGenerateLetter } from './useGenerateLetter';
import * as Styled from "./GenerationForm.styled";

const GenerationForm = () => {

  const { generatedContent, handleChange, handleSubmit, form, sendLetter, isGenerating, isLetterGenerated, userMessage } = useGenerateLetter();

  return (
    <Styled.MainContainer>
      <Styled.FormContainer>
      <Styled.UserMessage>{userMessage}</Styled.UserMessage>
        <Styled.Form
          form={form}
          onValuesChange={handleChange}
          onFinish={handleSubmit}
        >
          <Styled.FormItem
            name="senderName"
            rules={[{ required: true, message: "Please input sender name!" }]}
          >
            <Styled.Input placeholder="Type the sender name" />
          </Styled.FormItem>

          <Styled.FormItem
            name="senderAddress"
            rules={[{ required: true, message: "Please input sender address!" }]}
          >
            <Styled.Input placeholder="Type the sender address" />
          </Styled.FormItem>

          <Styled.FormItem
            name="receiverName"
            rules={[{ required: true, message: "Please input receiver name!" }]}
          >
            <Styled.Input placeholder="Type the receiver name" />
          </Styled.FormItem>

          <Styled.FormItem
            name="receiverAddress"
            rules={[{ required: true, message: "Please input receiver address!" }]}
          >
            <Styled.Input placeholder="Type the receiver address" />
          </Styled.FormItem>

          <Styled.FormItem
            name="subject"
            rules={[{ required: true, message: "Please input letter subject!" }]}
          >
            <Styled.Input placeholder="Type the subject of the letter" value={5252} />
          </Styled.FormItem>

          <Form.Item>
            <Space>
              <Button type="link" htmlType="submit" loading={isGenerating}>
                Generate letter
              </Button>
            </Space>
          </Form.Item>
        </Styled.Form>
      </Styled.FormContainer>

      <Styled.LetterContentContainer>
        <Styled.LetterContentHolder>
          {generatedContent}
        </Styled.LetterContentHolder>
        {isLetterGenerated && (
          <Styled.SendLetterButton type="link" onClick={sendLetter}>
            Send Letter
          </Styled.SendLetterButton>
        )}
      </Styled.LetterContentContainer>
    </Styled.MainContainer>

  )
}

export default GenerationForm