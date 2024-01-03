import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function Home() {
    const { enableWeb3, account, isWeb3Enabled, deactivateWeb3, isWeb3EnableLoading } = useMoralis();
    const [isMetaMask, setIsMetaMask] = useState(true);
    

    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined" && window.ethereum) {
            
            if (window.localStorage.getItem("connected") && window.ethereum.isMetaMask) {
                enableWeb3();
            }
        }
    }, [isWeb3Enabled, enableWeb3]);

    useEffect(() => {
        const handleAccountChanged = (accounts) => {
            if (!accounts.length) {
                window.localStorage.removeItem("connected");
                deactivateWeb3();
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountChanged);
            }
        };
    }, [deactivateWeb3]);

    async function connectWallet() {
        setIsMetaMask(window.ethereum.isMetaMask);
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            
            return;
        }

        try {
            await enableWeb3();
            window.localStorage.setItem("connected", "injected");
        } catch (error) {
            console.error(error);
        }
    }

    function disconnect() {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
    }

    return (
        <div>
            {account ? (
                <div onClick={disconnect} className="cursor-pointer  bg-[#def2ff] hover:bg-[#c4e1f5] py-2 px-4 text-[#0073bd] transition duration-300 ease-in-out  hover:text-[#0063a3] rounded-2xl font-medium">
                    {account.slice(0, 5)}.....{account.slice(account.length - 5)}
                </div>
            ) : (
                <button
                    disabled={isWeb3EnableLoading || !isMetaMask}
                    onClick={connectWallet}
                    className={` py-2 px-4 transition duration-300 ease-in-out  rounded-2xl font-medium ${
                        isMetaMask
                            ? "bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-600"
                            : "bg-red-100 text-red-500"
                    }`}
                    
                >
                    {!isMetaMask  ? <div>No Metamask</div>:<div>Connect </div>}
                    
                </button>
            )}
        </div>
    );
}
