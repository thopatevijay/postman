import { useState, useCallback, useEffect } from "react";
import { ChatGPTAPI } from 'chatgpt'
import { Form, FormInstance, message } from "antd";
import { CHAT_GPT_COMPLETION_PARAMS, CHAT_GPT_SYSTEM_MESSAGE } from "../../common/constant";
import { useContract } from "../../common/hooks/contract";
import { ethers } from "ethers";
import { useWalletContext } from "../../common/WalletProvider";
import { use } from "chai";

type UseSentLetterResult = {
    letters: any;
};

export function useSentLetters(): UseSentLetterResult {
    const [letters, setLetters] = useState();
    const { metaMask } = useWalletContext();
    const { contract } = useContract();

    const getLettersFromContract = useCallback(async () => {
        try {
            if (!contract) throw new Error("Contract not loaded");

            const letters = await contract.getLetters(metaMask?.selectedAddress);


            const processLetters = letters.map(entry => ({
                url: entry.letterURL,
                time: new Date(entry.timestamp.toNumber() * 1000).toLocaleString()
            }));
            return processLetters;

        } catch (error) {
            console.error("Error fetching the letters:", error);
            message.error(`Failed to retrieve letters: ${error.message}`);
        }
    }, [contract, metaMask?.selectedAddress]);

    const getLetters = useCallback(async () => {
        const letterData = await getLettersFromContract();
        setLetters(letterData);
    }, [getLettersFromContract]);

    useEffect(() => {
        getLetters();
    }, [getLetters]);

    return {
        letters
    };
}