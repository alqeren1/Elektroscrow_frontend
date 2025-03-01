import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function Home() {
    const { enableWeb3, account, isWeb3Enabled, deactivateWeb3, isWeb3EnableLoading } = useMoralis();
    const [isMetaMask, setIsMetaMask] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // Check if window is available
        if (typeof window !== "undefined") {
            const checkSize = () => {
                setIsSmallScreen(window.innerWidth < 480);
            };

            window.addEventListener("resize", checkSize);

            // Initial check
            checkSize();

            return () => window.removeEventListener("resize", checkSize);
        }
    }, []);

    //useEffect(() => {
    //    if (isWeb3Enabled) return;
    //    if (typeof window !== "undefined" && window.ethereum) {
    //        if (window.localStorage.getItem("connected") && window.ethereum.isMetaMask) {
    //            enableWeb3();
    //       }
    //    }
    //}, [isWeb3Enabled, enableWeb3]);

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
        setIsMetaMask(window.ethereum && window.ethereum.isMetaMask)
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            if (window.fathom) {
                window.fathom.trackEvent('connect-nometamask');
              }
            return;
        }

        try {
            await enableWeb3();
            window.localStorage.setItem("connected", "injected");
            if (window.fathom) {
                window.fathom.trackEvent('connected');
              }
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
                <div onClick={disconnect} className="cursor-pointer bg-[#fff091] w-56 justify-center flex wdefined:w-auto text-[#9c9259] hover:bg-[#e3d681] hover:text-[#6b643d] py-2 md:px-4 px-2 transition duration-300 ease-in-out rounded-xl wdefined:rounded-2xl font-medium">
                    
                        
                        {isSmallScreen ? (
                        <>{account.slice(0, 5)}....{account.slice(account.length - 5)}</>
                    ) : (
                        <>{account.slice(0, 5)}....{account.slice(account.length - 5)}</>
                    )}
                   
                </div>
            ) : (
                <button
                    disabled={isWeb3EnableLoading || !isMetaMask}
                    onClick={connectWallet}
                    className={` py-2 px-4 w-56 justify-center flex wdefined:w-auto transition duration-300 ease-in-out rounded-2xl font-medium ${
                        isMetaMask
                        ? "bg-[#fff091] text-[#9c9259] hover:bg-[#e3d681] hover:text-[#6b643d]"
                        : "bg-red-100 text-red-500"
                        }`}
                        >
                        {!isMetaMask ? <div className="whitespace-nowrap">No Metamask</div> : <div>Connect</div>}
                        </button>
                        )}
                        </div>
                        );
                        }
