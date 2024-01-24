import { useMoralis, useChain } from "react-moralis"
import { ConnectButton } from "web3uikit"
import WalletConnect from "./ConnectButtonWC"
import Eth from "../svgs/ethereum-logo"
import Bsc from "../svgs/bsc-logo"
import Polygon from "../svgs/polygon-logo"
import ManuelConnect from "./CustConnectButtonOnlyMetamask.jsx"

import Arrowdown from "../svgs/arrow-down"
import Arrowup from "../svgs/arrow-up"
import Error from "../svgs/error"
import React, { useState, useRef, useEffect } from "react"
const networks = [
    { name: "Ethereum", chainId: "0x1" },
    { name: "Binance Smart Chain", chainId: "0x38" },
    { name: "Polygon", chainId: "0x89" },
]

function NetworkSelector() {
    const { switchNetwork } = useChain()
    const { chainId } = useMoralis()
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null) // Ref for the dropdown

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownRef])
    const currentNetwork = networks.find((network) => network.chainId === chainId)

    const handleNetworkChange = async (newChainId) => {
        try {
            await switchNetwork(newChainId)
        } catch (error) {
            console.error(error)
        }
        setShowDropdown(false)
    }

    if (currentNetwork == null) {
        return (
            <div className="relative " ref={dropdownRef}>
                <div className="ml-6">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center wdefined:mr-2 rounded-2xl transition duration-300 ease-in-out hover:bg-gray-200   py-2 px-2 "
                    >
                        <Error />

                        <span
                            className={`transform transition-transform duration-200 ${
                                showDropdown ? "rotate-180 " : "rotate-0"
                            }`}
                        >
                            <Arrowup />
                        </span>
                    </button>
                </div>

                {showDropdown && (
                    <div className="absolute right-2 z-10 w-60 shadow-lg rounded-xl bg-white border  ">
                        <div className="p-2  wdefined:hidden items-center justify-center flex w-full ">
                            <ManuelConnect />
                        </div>
                        {networks.map((network) => (
                            <div
                                key={network.chainId}
                                className="flex items-center cursor-pointer p-2 "
                                onClick={() => handleNetworkChange(network.chainId)}
                            >
                                <div className="flex p-2 hover:bg-gray-100 w-full rounded-xl">
                                    <div>
                                        {network.name == "Ethereum" ? (
                                            <Eth />
                                        ) : network.name == "Binance Smart Chain" ? (
                                            <Bsc />
                                        ) : network.name == "Polygon" ? (
                                            <Polygon />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div>{network.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
    return (
        <div className="relative " ref={dropdownRef}>
            <div className="ml-10">
                {" "}
                {(currentNetwork.chainId == "0x1" ? (
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200 transition duration-300 ease-in-out py-2 px-2"
                    >
                        <Eth />
                        <span
                            className={`transform transition-transform duration-200 ${
                                showDropdown ? "rotate-180 " : "rotate-0"
                            }`}
                        >
                            <Arrowup />
                        </span>
                    </button>
                ) : (
                    ""
                )) ||
                    (currentNetwork.chainId == "0x38" ? (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200  transition duration-300 ease-in-out    py-2 px-2 "
                        >
                            <Bsc />

                            <span
                                className={`transform transition-transform duration-200 ${
                                    showDropdown ? "rotate-180 " : "rotate-0"
                                }`}
                            >
                                <Arrowup />
                            </span>
                        </button>
                    ) : (
                        ""
                    )) ||
                    (currentNetwork.chainId == "0x89" ? (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200  transition duration-300 ease-in-out  py-2 px-2 "
                        >
                            <Polygon />

                            <span
                                className={`transform transition-transform duration-200 ${
                                    showDropdown ? "rotate-180 " : "rotate-0"
                                }`}
                            >
                                <Arrowup />
                            </span>
                        </button>
                    ) : (
                        ""
                    ))}
            </div>

            {showDropdown && (
                <div className="absolute right-2 z-10 w-60 shadow-lg rounded-xl bg-white border rounded ">
                    <div className="p-2  wdefined:hidden items-center justify-center flex w-full ">
                        <ManuelConnect />
                    </div>
                    {networks.map((network) => (
                        <div
                            key={network.chainId}
                            className="flex items-center cursor-pointer p-2 "
                            onClick={() => handleNetworkChange(network.chainId)}
                        >
                            <div className="flex p-2 hover:bg-gray-100 w-full rounded-xl">
                                <div>
                                    {network.name == "Ethereum" ? (
                                        <Eth />
                                    ) : network.name == "Binance Smart Chain" ? (
                                        <Bsc />
                                    ) : network.name == "Polygon" ? (
                                        <Polygon />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div>{network.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default NetworkSelector
