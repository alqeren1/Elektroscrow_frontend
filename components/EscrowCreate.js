import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification, Icon } from "web3uikit"
import { Bell } from "@web3uikit/icons"

const abi_factory = require("../constants1/abi_factory.json") // Adjust the path to your ABI file
const abi_logic = require("../constants1/abi_logic.json") // Adjust the path to your ABI file
const escrowAddress = require("../constants1/escrowAddress.json")
const abi_ERC20 = require("../constants1/abi_ERC20.json")

export default function EscrowFactory() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()

    console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const factoryAddress = chainId in escrowAddress ? escrowAddress[chainId][0] : null
    const dispatch = useNotification()
    //değerin durmadan renderlanması için useState variable olmalı aşağıdaki gibi

    //     variable       function             starting value
    const [anyEscrows, setAnyEscrows] = useState("")
    const [seller, setSeller] = useState("")
    const [amountInput, setAmountInput] = useState("")
    const [amount, setAmount] = useState("0")

    const [i_amount, seti_amount] = useState("0")
    const [i_amount2, seti_amount2] = useState("0")
    const [isApproved, setIsApproved] = useState(false)

    const [tokenContract, setTokenContract] = useState("")
    const [i_seller, seti_seller] = useState("")
    const [i_buyer, seti_buyer] = useState("")

    const [getTokenContract, setGetTokenContract] = useState("")
    const [balance, setBalance] = useState("")

    console.log("Amount input: " + amountInput)
    const { runContractFunction: getBuyerEscrows } = useWeb3Contract({
        abi: abi_factory,
        contractAddress: factoryAddress,
        functionName: "getBuyerEscrows",
        params: { buyer: account },
    })

    const { runContractFunction: getEscrowBalance } = useWeb3Contract({
        abi: abi_logic,

        functionName: "getBalance",
    })
    const { runContractFunction: approve } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "approve",
        params: { spender: anyEscrows, value: i_amount2 },
    })
    const { runContractFunction: allowance } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "allowance",
        params: { owner: account, spender: anyEscrows },
    })
    const { runContractFunction: approve2 } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "approve",
        params: { spender: anyEscrows, value: i_amount },
    })
    const { runContractFunction: initialize } = useWeb3Contract({
        abi: abi_logic,
        contractAddress: anyEscrows,
        functionName: "initialize",
    })
    const { runContractFunction: geti_seller } = useWeb3Contract({
        abi: abi_logic,
        functionName: "i_seller",
    })
    const { runContractFunction: geti_buyer } = useWeb3Contract({
        abi: abi_logic,
        functionName: "i_buyer",
    })
    const { runContractFunction: geti_amount } = useWeb3Contract({
        abi: abi_logic,
        functionName: "i_amount",
    })
    const { runContractFunction: getEscrowToken } = useWeb3Contract({
        abi: abi_logic,

        functionName: "getTokenContract",
    })

    const {
        runContractFunction: escrowFactory,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi_factory,
        contractAddress: factoryAddress,
        functionName: "escrowFactory",
        params: {
            seller: seller,
            amount:
                amountInput && !isNaN(amountInput) && amountInput.trim() !== "" && amountInput > 0
                    ? ethers.parseUnits(amountInput, "ether")
                    : "0",
            tokenContract: tokenContract,
        },
    })

    async function updateUI() {
        const anyEscrowsFromCall = await getBuyerEscrows()
        if (!anyEscrowsFromCall || anyEscrowsFromCall.length === 0) {
            setAnyEscrows("No current escrows")
        } else {
            const latestEscrow = anyEscrowsFromCall[anyEscrowsFromCall.length - 1]
            setAnyEscrows(latestEscrow)

            // Ensure that the contract address is valid before calling getEscrowBalance
            if (latestEscrow && ethers.isAddress(latestEscrow)) {
                const balanceFromCall = await getEscrowBalance({
                    params: { contractAddress: latestEscrow },
                })
                const token = await getEscrowToken({
                    params: { contractAddress: latestEscrow },
                })
                const i_seller = await geti_seller({ params: { contractAddress: latestEscrow } })
                const i_buyer = await geti_buyer({ params: { contractAddress: latestEscrow } })

                const _amount = await geti_amount({ params: { contractAddress: latestEscrow } })
                const i_amount = _amount
                console.log("amount: " + _amount)

                let i_amount2 = _amount.mul(2)
                seti_buyer(i_buyer)
                seti_amount(i_amount)
                seti_amount2(i_amount2)

                seti_seller(i_seller)
                setGetTokenContract(token)
                setBalance(balanceFromCall ? balanceFromCall.toString() : "0")
            } else {
                setBalance("0")
            }
        }
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
            checkApproval()
        }
    }, [
        isWeb3Enabled,
        account,
        i_buyer,
        i_seller,
        i_amount,
        i_amount2,
        getTokenContract,
        anyEscrows,
    ])
    const checkApproval = async () => {
        if (ethers.getAddress(account) == i_buyer) {
            try {
                const approvedAmount = await allowance()
                console.log("Approved amount and i_amount: " + approvedAmount + " " + i_amount2)
                setIsApproved(approvedAmount >= i_amount2)
            } catch (error) {
                console.log("Approved amount and i_amount: " + approvedAmount + " " + i_amount2)

                console.error("Error checking approval:", error)
            }
        }
        if (ethers.getAddress(account) == i_seller) {
            try {
                const approvedAmount = await allowance()
                setIsApproved(approvedAmount >= i_amount)
            } catch (error) {
                console.error("Error checking approval:", error)
            }
        }
    }
    const handlesuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    const startEscrowButton = async () => {
        // Call your contract function here using the inputs as parameters
        if (amountInput >= 0) {
            try {
                await setAmount(amountInput)

                await escrowFactory({
                    onSuccess: handlesuccess,
                    onError: (error) => console.error("Error occurred:", error),
                })
                console.log("Seller:", seller)
                console.log("Amount:", amount)
                console.log("Token Contract:", tokenContract)
                console.log("Balance:", balance)
                console.log("escrow:", anyEscrows)
            } catch (error) {
                console.error("Error occurred:", error)
            }
        }
    }
    const fundButton = async () => {
        // Call your contract function here using the inputs as parameters

        try {
            await initialize({
                onSuccess: handlesuccess,
                onError: (error) => console.error("Error occurred:", error),
            })
            console.log("Seller:", seller)
            console.log("Amount:", amount)
            console.log("Token Contract:", tokenContract)
            console.log("Balance:", balance)
            console.log("escrow:", anyEscrows)
        } catch (error) {
            console.error("Error occurred:", error)
        }
    }

    const approveButton = async () => {
        // Call your contract function here using the inputs as parameters
        console.log(ethers.getAddress(account))
        console.log(ethers.getAddress(i_buyer))
        if (ethers.getAddress(account) == i_buyer) {
            try {
                await approve({
                    onSuccess: () => {
                        handlesuccess
                        setIsApproved(true)
                    },
                    onError: (error) => console.error("Error occurred:", error),
                })
            } catch (error) {
                console.error("Error occurred:", error)
            }
        }
        if (ethers.getAddress(account) == i_seller) {
            try {
                await approve2({
                    onSuccess: handlesuccess,
                    onError: (error) => console.error("Error occurred:", error),
                })
            } catch (error) {
                console.error("Error occurred:", error)
            }
        }
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction is complete",
            title: "Tx Notification",
            position: "topR",
            icon: <Bell />,
        })
    }

    return (
        <div className="p-5">
            {isWeb3Enabled ? (
                <>
                    Hi from Decentralized escrow!
                    {escrowAddress ? (
                        <div className="mb-4">
                            Current escrow: {anyEscrows}
                            <div className="mb-4"></div>
                            {anyEscrows === "No current escrows" && (
                                <>
                                    {/* Input fields */}
                                    <input
                                        className="w-full rounded ml-auto py-2 px-4 mb-2 border-2 border-blue-500"
                                        type="text"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                        placeholder="Enter seller address"
                                    />
                                    <input
                                        className="w-full rounded ml-auto py-2 px-4  mb-2 border-2 border-blue-500"
                                        type="text"
                                        value={amountInput}
                                        onChange={(e) => setAmountInput(e.target.value)}
                                        placeholder="Enter escrow amount (How many tokens)"
                                    />
                                    <input
                                        className="w-full rounded ml-auto py-2 px-4 mb-4 border-2 border-blue-500"
                                        type="text"
                                        value={tokenContract}
                                        onChange={(e) => setTokenContract(e.target.value)}
                                        placeholder="Enter token contract to be used for escrow"
                                    />

                                    {/* Start Escrow Button */}
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-right mr-4 flex items-center justify-center"
                                        onClick={startEscrowButton}
                                        disabled={isLoading || isFetching}
                                    >
                                        {isLoading || isFetching ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            "Start Escrow"
                                        )}
                                    </button>
                                </>
                            )}
                            {/* Conditional Buttons */}
                            {!isApproved && anyEscrows != "No current escrows" && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-right mr-4 flex items-center justify-center"
                                    onClick={approveButton}
                                    disabled={isLoading || isFetching}
                                >
                                    {isLoading || isFetching ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Approve"
                                    )}
                                </button>
                            )}
                            {isApproved && anyEscrows != "No current escrows" && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-right mr-4 flex items-center justify-center"
                                    onClick={fundButton}
                                    disabled={isLoading || isFetching}
                                >
                                    {isLoading || isFetching ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Fund"
                                    )}
                                </button>
                            )}
                            {/* Escrow Information */}
                            {anyEscrows != "No current escrows" && (
                                <>
                                    <div>Escrow balance: {balance / 10 ** 18}</div>
                                    <div>Token contract: {getTokenContract}</div>
                                    <div>Seller address: {i_seller}</div>
                                    <div>Buyer address: {i_buyer}</div>
                                    <div>Escrow amount: {i_amount / 10 ** 18}</div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div>No Escrow address found</div>
                    )}
                </>
            ) : (
                <div>Wallet not connected</div>
            )}
        </div>
    )
}
