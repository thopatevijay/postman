import { ethers } from "ethers";
import { useMemo } from "react";
import { ABI, CONTRACT_ADDRESS } from "../../../contract-details.json";

declare global {
    interface Window {
        ethereum: any;
    }
}

export function useContract(): { contract: ethers.Contract | undefined; signerAndProvider: { signer: ethers.providers.JsonRpcSigner; provider: ethers.providers.Web3Provider; } | undefined } {

    const signerAndProvider = useMemo(() => {
        if (typeof window !== "undefined" && window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            return { signer, provider };
        }
        return undefined;
    }, []);

    console.log("provider", signerAndProvider);

    const contract = useMemo(() => {
        if (!signerAndProvider) return undefined;
        return new ethers.Contract(CONTRACT_ADDRESS, ABI, signerAndProvider.signer);
    }, [signerAndProvider]);

    return { contract, signerAndProvider };
}
