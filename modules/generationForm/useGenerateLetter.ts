import { useState, useCallback } from "react";
import { ChatGPTAPI } from 'chatgpt'
import { Form, FormInstance, message } from "antd";
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
    sendLetter: () => void;
    isGenerating: boolean;
    isLetterGenerated: boolean;
};

export function useGenerateLetter(): UseLetterResult {
    const [generatedContent, setGeneratedContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLetterGenerated, setIsLetterGenerated] = useState(false);

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
            The letter should be well-written, clear, and short (about 250 words).
        `;
            return prompt;
        },
        []
    );

    const generateLetter = useCallback(async (prompt) => {
        setIsGenerating(true);

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
            setIsGenerating(false);

            setIsLetterGenerated(true);
        } catch (err) {
            console.log(err);
            setIsGenerating(false);
        }
    }, [setGeneratedContent]);

    const sendLetter = useCallback(async () => {

        const values = form.getFieldsValue();
        const to = {
            firstName: values.receiverName,
            lastName: '',
            addressLine1: '200 UNIVERSITY AVE W',
            addressLine2: values.receiverAddress,
            city: '',
            provinceOrState: '',
            postalOrZip: '',
        };

        const from = {
            firstName: values.senderName,
            lastName: '',
            addressLine1: '3075 14TH AVE 212',
            addressLine2: values.senderAddress,
            city: '',
            provinceOrState: '',
            postalOrZip: '',
        };

        const description = values.subject;

        const content = generatedContent;

        try {
            const response = await fetch("/api/postGrid/sendLetter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ to, from, description, content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error sending letter');
            }

            await response.json();
            message.success('Letter sent successfully!');
            setGeneratedContent("");
            setIsLetterGenerated(false);
            setIsGenerating(false);
        } catch (error) {
            console.error(error);
            message.error(error.message);
        }

    }, [form, generatedContent]);


    const handleSubmit = useCallback(
        async (values: GenerateFormValues) => {
            const prompt = getChatGptPrompt(values);

            generateLetter(prompt);
        },
        [generateLetter, getChatGptPrompt]
    );

    return {
        generatedContent,
        generateLetter,
        handleChange,
        handleSubmit,
        form,
        sendLetter,
        isLetterGenerated,
        isGenerating,
    };
}
