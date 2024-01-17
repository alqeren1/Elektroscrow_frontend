import React, { useState, useEffect, useRef } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"

import tokens from "../default_tokens/mainnet.json"
const abi_ERC20 = require("../constants1/abi_ERC20.json")
const abi_ERC20_bytes = require("../constants1/abi_ERC20_bytes.json")
const BigNumber = require("bignumber.js")

const TokenInput = ({ setTokenContract, onTokenValidation, setTokenSymbolParent, onClose }) => {
    const modalRef = useRef()
    const { account } = useMoralis()

    const [modalOpen, setModalOpen] = useState(false)
    const [isCustomToken, setIsCustomToken] = useState(false)
    const [selectedToken, setSelectedToken] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredTokens, setFilteredTokens] = useState("")
    const [tokenContractChild, setTokenContractChild] = useState("")
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [tokenName, setTokenName] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")
    const [displayTokenName, setDisplayTokenName] = useState("")
    const [displayTokenSymbol, setDisplayTokenSymbol] = useState("")
    const [tokenImageUrl, setTokenImageUrl] = useState("")

    const { runContractFunction: checkToken1 } = useWeb3Contract({
        abi: abi_ERC20,

        functionName: "decimals",
    })
    const { runContractFunction: checkToken2 } = useWeb3Contract({
        abi: abi_ERC20,

        functionName: "name",
    })
    const { runContractFunction: checkToken3 } = useWeb3Contract({
        abi: abi_ERC20,

        functionName: "symbol",
    })

    const { runContractFunction: checkToken1_bytes } = useWeb3Contract({
        abi: abi_ERC20_bytes,

        functionName: "decimals",
    })
    const { runContractFunction: checkToken2_bytes } = useWeb3Contract({
        abi: abi_ERC20_bytes,

        functionName: "name",
    })
    const { runContractFunction: checkToken3_bytes } = useWeb3Contract({
        abi: abi_ERC20_bytes,

        functionName: "symbol",
    })
    const { runContractFunction: balanceOf } = useWeb3Contract({
        abi: abi_ERC20,

        functionName: "balanceOf",
    })
    function hexToString(hex) {
        // Remove the "0x" prefix if it's present
        hex = hex.toString()
        if (hex.startsWith("0x")) {
            hex = hex.slice(2)
        }

        var str = ""
        for (var i = 0; i < hex.length; i += 2) {
            var v = parseInt(hex.substr(i, 2), 16)
            if (v) str += String.fromCharCode(v)
        }
        return str
    }
    async function tokenContractCheck() {
        if (!ethers.isAddress(searchTerm)) {
            return
        }
        const decimals = await checkToken1({ params: { contractAddress: searchTerm } })
        const name = await checkToken2({ params: { contractAddress: searchTerm } })
        const symbol = await checkToken3({ params: { contractAddress: searchTerm } })

        if (!decimals || !name || !symbol) {
            const decimals_bytes = await checkToken1_bytes({
                params: { contractAddress: searchTerm },
            })
            const name_bytes = await checkToken2_bytes({
                params: { contractAddress: searchTerm },
            })
            const symbol_bytes = await checkToken3_bytes({
                params: { contractAddress: searchTerm },
            })
            if (!decimals_bytes || !name_bytes || !symbol_bytes) {
                console.log("Not a valid ERC-20 token")

                setIsTokenValid(false)
                onTokenValidation(false)
                return
            }

            setIsTokenValid(true)
            onTokenValidation(true)
            setTokenName(hexToString(name_bytes))
            setTokenSymbol(hexToString(symbol_bytes))
            setTokenSymbolParent(hexToString(symbol_bytes))
            console.log(
                `Token details: ${hexToString(name_bytes)} (${hexToString(
                    symbol_bytes,
                )}), Decimals: ${parseInt(decimals_bytes.toHexString(), 16)}`,
            )
            return
        }
        setIsTokenValid(true)
        onTokenValidation(true)
        setTokenName(name)

        setTokenSymbol(symbol)

        setTokenSymbolParent(symbol)
        console.log(`Token details: ${name} (${symbol}), Decimals: ${decimals}`)
    }
    async function tokenContractCheck2() {
        const decimals = await checkToken1({ params: { contractAddress: tokenContractChild } })
        const name = await checkToken2({ params: { contractAddress: tokenContractChild } })
        const symbol = await checkToken3({ params: { contractAddress: tokenContractChild } })

        if (!decimals || !name || !symbol) {
            const decimals_bytes = await checkToken1_bytes({
                params: { contractAddress: tokenContractChild },
            })
            const name_bytes = await checkToken2_bytes({
                params: { contractAddress: tokenContractChild },
            })
            const symbol_bytes = await checkToken3_bytes({
                params: { contractAddress: tokenContractChild },
            })
            if (!decimals_bytes || !name_bytes || !symbol_bytes) {
                console.log("Not a valid ERC-20 token")

                setIsTokenValid(false)
                onTokenValidation(false)
                return
            }

            setIsTokenValid(true)
            onTokenValidation(true)
            setTokenName(hexToString(name_bytes))
            setTokenSymbol(hexToString(symbol_bytes))
            setTokenSymbolParent(hexToString(symbol_bytes))
            console.log(
                `Token details: ${hexToString(name_bytes)} (${hexToString(
                    symbol_bytes,
                )}), Decimals: ${parseInt(decimals_bytes.toHexString(), 16)}`,
            )
            return
        }
        setIsTokenValid(true)
        onTokenValidation(true)
        setTokenName(name)
        setTokenSymbol(symbol)
        setTokenSymbolParent(symbol)
        console.log(`Token details: ${name} (${symbol}), Decimals: ${decimals}`)
    }
    const closeModalOnOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalOpen(false)
        }
    }
    async function addButton() {
        setTokenContract(searchTerm)
        setTokenContractChild(searchTerm)
        setIsCustomToken(true)
        setDisplayTokenName(tokenName)

        setDisplayTokenSymbol(tokenSymbol)
        setModalOpen(false)
        setTokenImageUrl(
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        )
        setSearchTerm("")
    }

    useEffect(() => {
        const searchLowerCase = searchTerm.toLowerCase()
        const filtered = tokens.filter(
            (token) =>
                token.name.toLowerCase().includes(searchLowerCase) ||
                token.address.toLowerCase().includes(searchLowerCase) ||
                token.symbol.toLowerCase().includes(searchLowerCase),
        )
        setFilteredTokens(filtered)
        if (tokenContractChild != "") {
            tokenContractCheck2()
        }
        if (ethers.isAddress(searchTerm)) {
            tokenContractCheck()
        } else {
            setIsTokenValid(false)
            onTokenValidation(false)
        }
    }, [searchTerm, tokenContractChild])
    useEffect(() => {
        if (modalOpen) {
            document.addEventListener("mousedown", closeModalOnOutsideClick)
            setSearchTerm("")
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", closeModalOnOutsideClick)
        }
    }, [modalOpen])

    const handleTokenSelect = (token) => {
        setTokenContract(token.address)
        setTokenContractChild(token.address)
        setSelectedToken(token)
        setIsCustomToken(false)
        setDisplayTokenName(token.name)
        setDisplayTokenSymbol(token.symbol)
        setTokenImageUrl(token.logoURI)
        setModalOpen(false)
        setSearchTerm("")
    }

    return (
        <div>
            <div
                className={`w-full rounded py-4 px-4  hover:bg-gray-50 cursor-pointer bg-white border-2 rounded-xl flex items-center ${
                    modalOpen ? "focus:outline-none focus:ring-0" : ""
                }`}
                onClick={() => setModalOpen(true)}
            >
                {tokenImageUrl && <img src={tokenImageUrl} alt="Token" className="w-5 h-5 mr-2" />}
                <span className="flex-1">
                    {displayTokenName ? (
                        <div className="text-gray-700 font-medium mr-3">{displayTokenName}</div>
                    ) : (
                        <div className="text-gray-400"> Select token contract</div>
                    )}
                </span>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end wdefined:items-center">
                    <div
                        ref={modalRef}
                        className="relative bg-white py-4  shadow-lg w-full min-480px-width h-1/2 wdefined:h-[613px] rounded-t-3xl wdefined:rounded-3xl"
                    >
                        <div className="sticky top-0 bg-white pt-2 px-4  rounded-3xl z-10">
                            <div className="flex  items-center mt-1  mb-4">
                                <div className="font-bold text-gray-700 ml-1">Select a token</div>

                                <button
                                    className="absolute  right-1 text-gray-700  mr-4 text-xl font-bold "
                                    onClick={() => setModalOpen(false)}
                                >
                                    &#10005; {/* X symbol */}
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search token by name or address"
                                className="p-2 border border-gray-300 rounded w-full focus:outline-none rounded-xl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className=" w-full border-b-2 border-gray-300/50 mt-4 "></div>
                        <div
                            className="overflow-y-auto px-2 scrollbar-hide "
                            style={{ maxHeight: "calc(100% - 103px)" }}
                        >
                            {filteredTokens.map((token, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-2 hover:bg-gray-200 h-16 mt-1 rounded-xl   cursor-pointer "
                                    onClick={() => handleTokenSelect(token)}
                                >
                                    <img
                                        src={token.logoURI}
                                        alt={token.symbol}
                                        className="w-9 h-9 mr-4"
                                    />

                                    <div>
                                        <div className="font-medium text-gray-700">
                                            {token.name}
                                        </div>
                                        <div className="text-xs text-gray-700">{token.symbol}</div>
                                    </div>
                                </div>
                            ))}
                            {filteredTokens.length === 0 && !isTokenValid && (
                                <div className="p-2 text-gray-600">No tokens found</div>
                            )}
                            {filteredTokens.length === 0 && isTokenValid && (
                                <div>
                                    <div className="p-2 text-gray-600 text-xs">
                                        Add custom token
                                    </div>
                                    <div
                                        className="flex items-center p-2 h-16 hover:bg-gray-100 cursor-pointer rounded-xl"
                                        onClick={addButton}
                                    >
                                        <img
                                            src={
                                                "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                                            }
                                            alt={tokenSymbol}
                                            className="w-9 h-9 mr-2"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-700">
                                                {tokenName}
                                            </div>
                                            <div className="text-xs text-gray-700">
                                                {tokenSymbol}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TokenInput
