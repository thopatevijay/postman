import { useState, useCallback } from "react";
import { ChatGPTAPI } from 'chatgpt'
import { Form, FormInstance } from "antd";
import { CHAT_GPT_COMPLETION_PARAMS, CHAT_GPT_SYSTEM_MESSAGE } from "../../common/constant";

type GenerateFormValues = {
    senderName: string;
    senderAddress: string;
    receiverName: string;
    receiverAddress: string;
    subject: string;
};

type UseLetterResult = {
    generatedContent: string;
    form: FormInstance<GenerateFormValues>;
    generateLetter: (prompt: string) => void;
    handleChange: (changedValues: any, allValues: any) => void;
    handleSubmit: (values: GenerateFormValues) => void;
};

export function useGenerateLetter(): UseLetterResult {
    const [generatedContent, setGeneratedContent] = useState("");
    const [form] = Form.useForm<GenerateFormValues>();

    const handleChange = useCallback(
        async (_changedValues: any, allValues: any) => {
            form.setFieldsValue(allValues);
        },
        [form]
    );

    const getChatGptPrompt = useCallback(
        (values: GenerateFormValues) => {

            let prompt = `My name is ${values.senderName} and I live at ${values.senderAddress}. Write a letter to ${values.receiverName}. The address of is ${values.receiverAddress}. 
            The subject of my letter is: ${values.subject}.
            Be respectful and professional in tone.
            Do not include any variables or brackets, like [Your Name] or [Date]. Start your reply with the salutation, like "Dear...".
            The letter should be well-written, clear, and short (about 300 words).
        `;
            return prompt;
        },
        []
    );

    const generateLetter = useCallback(async (prompt) => {
        const openai = new ChatGPTAPI({
            apiKey: process.env.CHATGPT_KEY,
            completionParams: CHAT_GPT_COMPLETION_PARAMS,
            systemMessage: CHAT_GPT_SYSTEM_MESSAGE,
        });

        try {
            await openai.sendMessage(`${prompt}`, {
                onProgress: (partialResponse) => {
                    setGeneratedContent(partialResponse.text);
                },
            });

        } catch (err) {
            console.log(err);
        }
    }, [setGeneratedContent]);

    const handleSubmit = useCallback(
        async (values: GenerateFormValues) => {
            console.log(values)
            const prompt = getChatGptPrompt(values);
            console.log(prompt)

            generateLetter(prompt);
        },
        [generateLetter, getChatGptPrompt]
    );

    return {
        generatedContent,
        generateLetter,
        handleChange,
        handleSubmit,
        form
    };
}