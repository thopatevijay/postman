import React, { useState, createContext, useEffect, useContext, useCallback } from 'react';
import { useMetaMask } from "metamask-react";

export interface MetaMaskState {
    isConnected: boolean;
    selectedAddress: string;
}

export interface WalletContextType {
    metaMask: MetaMaskState;
    connectToMetaMask: () => Promise<void>;
}

const defaultMetamaskState = {
    metaMask: {
        isConnected: false,
        selectedAddress: "",
    },
};

const WalletContext = createContext<WalletContextType>({
    metaMask: defaultMetamaskState.metaMask,
    connectToMetaMask: async () => { },
});

interface WalletProviderProps {
    children: React.ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [metaMask, setMetaMask] = useState<MetaMaskState>(defaultMetamaskState.metaMask);
    const { ethereum, connect } = useMetaMask();

    const connectToMetaMask = useCallback(async () => {
        try {
            const accounts = await connect();
            if (accounts?.length) {
                setMetaMask({
                    isConnected: !!ethereum?.selectedAddress,
                    selectedAddress: ethereum?.selectedAddress || '',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [connect, ethereum?.selectedAddress]);

    useEffect(() => {
        if (ethereum) {
            setMetaMask({
                isConnected: !!ethereum.selectedAddress,
                selectedAddress: ethereum.selectedAddress,
            });
        }
    }, [ethereum]);

    return (
        <WalletContext.Provider value={{ metaMask, connectToMetaMask }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider

export const useWalletContext = () => {
    return useContext(WalletContext);
};
