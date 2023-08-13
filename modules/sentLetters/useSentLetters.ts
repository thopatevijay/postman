import { useState, useCallback, useEffect } from "react";
import { message } from "antd";
import { useWalletContext } from "../../common/WalletProvider";
import { useContract } from "../../common/hooks/contract";

type UseSentLetterResult = {
    letters: any;
};

export function useSentLetters(): UseSentLetterResult {
    const [letters, setLetters] = useState();
    const { metaMask } = useWalletContext();
    const { contract } = useContract();

    const getLettersFromContract = useCallback(async () => {
        console.log("metaMask?.selectedAddress", metaMask?.selectedAddress)
        try {
            const getLetters = await fetch(`/api/postGrid/getLetters?searchQuery=${metaMask?.selectedAddress}`);
            if (!getLetters.ok) {
                throw new Error("Error getting letter");
            }
            const { data } = await getLetters.json();
            return data;
        } catch (error) {
            console.error("Error fetching the letters:", error);
            message.error(`Failed to retrieve letters: ${error.message}`);
        }
    }, [metaMask?.selectedAddress]);

    const getLetters = useCallback(async () => {
        const letterData = await getLettersFromContract();
        setLetters(letterData);
    }, [getLettersFromContract]);

    useEffect(() => {
        getLetters();

        contract.on("FeeReceived", () =>  getLetters());

        return () => {
            contract.off("FeeReceived", () => getLetters());
        };
    }, [getLetters, contract]);

    return {
        letters,
    };
}