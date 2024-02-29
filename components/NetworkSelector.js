import { useMoralis, useChain } from "react-moralis"
import { ConnectButton } from "web3uikit"
import WalletConnect from "./ConnectButtonWC"
import Eth from "../svgs/ethereum-logo"
import Bsc from "../svgs/bsc-logo"
import Polygon from "../svgs/polygon-logo"
import Avax from "../svgs/avax-logo"
import Op from "../svgs/op"
import Base from "../svgs/base"
import Celo from "../svgs/celo"
import Arb from "../svgs/arb"

import ManuelConnect from "./CustConnectButtonOnlyMetamask.jsx"

import Arrowdown from "../svgs/arrow-down"
import Arrowup from "../svgs/arrow-up"
import Error from "../svgs/error"
import React, { useState, useRef, useEffect } from "react"
const networks = [
    { name: "BNB Chain", chainId: "0x38" },
    { name: "Arbitrum", chainId: "0xa4b1" },

    { name: "Optimism", chainId: "0xa" },
    { name: "Base", chainId: "0x2105" },
    { name: "Polygon", chainId: "0x89" },
    { name: "Celo", chainId: "0xa4ec" },
    { name: "Avax", chainId: "0xa86a" },
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
                                        {network.name == "BNB Chain" ? (
                                            <Bsc />
                                        ) : network.name == "Arbitrum" ? (
                                            <Arb />
                                        ) : network.name == "Optimism" ? (
                                            <Op />
                                        ) : network.name == "Base" ? (
                                            <Base />
                                        ) : network.name == "Polygon" ? (
                                            <Polygon />
                                        ) : network.name == "Avax" ? (
                                            <Avax />
                                        ) : network.name == "Celo" ? (
                                            <Celo />
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
            <div>
                {" "}
                {(currentNetwork.chainId == "0x38" ? (
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
                    (currentNetwork.chainId == "0xa4b1" ? (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200  transition duration-300 ease-in-out  py-2 px-2 "
                        >
                            <Arb />

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
                    (currentNetwork.chainId == "0xa" ? (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200  transition duration-300 ease-in-out  py-2 px-2 "
                        >
                            <Op />

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
                    (currentNetwork.chainId == "0x2105" ? (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200  transition duration-300 ease-in-out  py-2 px-2 "
                        >
                            <Base />

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
                    (currentNetwork.chainId == "0xa4ec" ? (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200  transition duration-300 ease-in-out  py-2 px-2 "
                        >
                            <Celo />

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
                    )) ||
                    (currentNetwork.chainId == "0xa86a" ? (
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center wdefined:mr-2 rounded-2xl hover:bg-gray-200  transition duration-300 ease-in-out  py-2 px-2 "
                        >
                            <Avax />

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
                                    {network.name == "BNB Chain" ? (
                                        <Bsc />
                                    ) : network.name == "Arbitrum" ? (
                                        <Arb />
                                    ) : network.name == "Optimism" ? (
                                        <Op />
                                    ) : network.name == "Base" ? (
                                        <Base />
                                    ) : network.name == "Polygon" ? (
                                        <Polygon />
                                    ) : network.name == "Avax" ? (
                                        <Avax />
                                    ) : network.name == "Celo" ? (
                                        <Celo />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div
                                    className={` ${
                                        chainId == network.chainId ? "font-medium " : ""
                                    }`}
                                >
                                    {network.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default NetworkSelector
