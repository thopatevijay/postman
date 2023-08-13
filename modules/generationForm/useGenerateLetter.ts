import { useState, useCallback } from "react";
import { ChatGPTAPI } from 'chatgpt'
import { Form, FormInstance, message } from "antd";
import { CHAT_GPT_COMPLETION_PARAMS, CHAT_GPT_SYSTEM_MESSAGE } from "../../common/constant";
import { useContract } from "../../common/hooks/contract";
import { ethers } from "ethers";
import { useWalletContext } from "../../common/WalletProvider";

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
    userMessage: string;
};

export function useGenerateLetter(): UseLetterResult {
    const [generatedContent, setGeneratedContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLetterGenerated, setIsLetterGenerated] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const { contract, signerAndProvider } = useContract();
    const { metaMask, connectToMetaMask } = useWalletContext();

    const [form] = Form.useForm<GenerateFormValues>();

    const handleChange = useCallback(
        async (_changedValues: any, allValues: any) => {
            form.setFieldsValue(allValues);
            setUserMessage("");
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
        setUserMessage("Generating letter...");
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
            setUserMessage("Letter generated successfully!");
            setIsLetterGenerated(true);
        } catch (err) {
            console.log(err);
            setIsGenerating(false);
        }
    }, [setGeneratedContent]);



    const sendLetter = useCallback(async () => {
        setUserMessage("Letter is being sent...");
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
                body: JSON.stringify({ to, from, description, content, walletAddress: metaMask?.selectedAddress }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error sending letter');
            }

            const data = await response.json();
            console.log(data);


            message.success('Letter sent successfully!');
            setGeneratedContent("");
            setIsLetterGenerated(false);
            setIsGenerating(false);
        } catch (error) {
            console.error(error);
            message.error(error.message);
            setUserMessage("Error sending letter");
        }

    }, [form, generatedContent, metaMask?.selectedAddress]);

    const triggerPayFee = useCallback(async () => {
        try {
            // Check if MetaMask is connected
            if (!metaMask?.isConnected) {
                message.info("Connecting to MetaMask...");
                await connectToMetaMask();

                // Recheck after attempting to connect
                if (!metaMask?.isConnected) {
                    throw new Error("Failed to connect to MetaMask");
                }
            }

            setUserMessage("Paying fee...");

            if (!contract) throw new Error("Contract not loaded");

            // Get balance of the current account
            const balance = await signerAndProvider.provider.getBalance(metaMask.selectedAddress);
            const requiredFee = ethers.utils.parseEther("0.0000000001");
            console.log("Balance", balance.toString());
            // Check if the balance is sufficient
            if (balance.lt(requiredFee)) {
                throw new Error("Insufficient ETH for the fee");
            }

            const transaction = await contract.payFee({ value: requiredFee });

            const receipt = await transaction.wait();

            if (receipt.transactionHash) {
                message.success(`Fee paid successfully!. Transaction hash: ${receipt.transactionHash}`);
                setUserMessage("Fee paid successfully!");
                sendLetter();
            }

            console.log(`Transaction hash: ${receipt.transactionHash}`);
        } catch (error) {
            if (error.code === 4001) {
                // Error code for user rejection in MetaMask
                setUserMessage("Transaction was rejected by user");
                message.error("Transaction was rejected by user");
            } else {
                console.error("Error while paying fee:", error);
                message.error(`Error while paying fee: ${error.message}`);
                setUserMessage("Error while paying fee. Please try again.");
            }
        }
    }, [connectToMetaMask, contract, metaMask?.isConnected, metaMask.selectedAddress, sendLetter, signerAndProvider?.provider]);


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
        sendLetter: triggerPayFee,
        isLetterGenerated,
        isGenerating,
        userMessage,
    };
}
