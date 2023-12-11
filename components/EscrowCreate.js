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
    const latest_address = chainId in escrowAddress ? escrowAddress[chainId].length : null
    const factoryAddress =
        chainId in escrowAddress ? escrowAddress[chainId][latest_address - 1] : null
    const dispatch = useNotification()
    //değerin durmadan renderlanması için useState variable olmalı aşağıdaki gibi

    //     variable       function             starting value
    const [anyEscrows, setAnyEscrows] = useState("")
    const [currentEscrow, setCurrentEscrow] = useState("Initial")

    const [seller, setSeller] = useState("")
    const [amountInput, setAmountInput] = useState("")
    const [amount, setAmount] = useState("0")

    const [i_amount, seti_amount] = useState("0")
    const [i_amount2, seti_amount2] = useState("0")
    const [isApproved, setIsApproved] = useState(false)
    const [isFunded, setIsFunded] = useState(false)

    const [decisionBuyer, setDecisionBuyer] = useState("None")
    const [decisionSeller, setDecisionSeller] = useState("None")

    const [isAccepting, setIsAccepting] = useState(false)
    const [isDeclining, setIsDeclining] = useState(false)
    const [isRefunding, setIsRefunding] = useState(false)
    const [isEscrowEnded, setIsEscrowEnded] = useState(false)
    const [escrowStatus, setEscrowStatus] = useState("")

    const [tokenContract, setTokenContract] = useState("")
    const [i_seller, seti_seller] = useState("")
    const [i_buyer, seti_buyer] = useState("")
    const [initializeState, setInitializeState] = useState("")
    const [initializeStateString, setInitializeStateString] = useState("")
    const [buyerState, setBuyerState] = useState(true)

    const [getTokenContract, setGetTokenContract] = useState("")
    const [balance, setBalance] = useState("")

    const [isApproving, setIsApproving] = useState(false)
    const [isFunding, setIsFunding] = useState(false)
    const [isWithdrawing, setIsWithdrawing] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [previousEscrowsBuyer, setPreviousEscrowsBuyer] = useState([])
    const [previousEscrowsSeller, setPreviousEscrowsSeller] = useState([])
    const [showInputFields, setShowInputFields] = useState(false)

    const { runContractFunction: getBuyerEscrows } = useWeb3Contract({
        abi: abi_factory,
        contractAddress: factoryAddress,
        functionName: "getBuyerEscrows",
        params: { buyer: account },
    })
    const { runContractFunction: getSellerEscrows } = useWeb3Contract({
        abi: abi_factory,
        contractAddress: factoryAddress,
        functionName: "getSellerEscrows",
        params: { seller: account },
    })

    const { runContractFunction: getEscrowBalance } = useWeb3Contract({
        abi: abi_logic,

        functionName: "getBalance",
    })
    const { runContractFunction: getCheckPayment } = useWeb3Contract({
        abi: abi_logic,

        functionName: "checkPayment",
    })
    const { runContractFunction: getDecisions } = useWeb3Contract({
        abi: abi_logic,
        contractAddress: currentEscrow,
        functionName: "getDecisions",
    })
    const { runContractFunction: approve } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "approve",
        params: { spender: currentEscrow, value: i_amount2 },
    })
    const { runContractFunction: allowance } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "allowance",
    })
    const { runContractFunction: approve2 } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "approve",
        params: { spender: currentEscrow, value: i_amount },
    })
    const { runContractFunction: initialize } = useWeb3Contract({
        abi: abi_logic,
        contractAddress: currentEscrow,
        functionName: "initialize",
    })
    const { runContractFunction: finishEscrow } = useWeb3Contract({
        abi: abi_logic,
        contractAddress: currentEscrow,
        functionName: "finishEscrow",
    })
    const { runContractFunction: withdraw } = useWeb3Contract({
        abi: abi_logic,
        contractAddress: currentEscrow,
        functionName: "withdraw",
    })
    const { runContractFunction: geti_seller } = useWeb3Contract({
        abi: abi_logic,
        functionName: "i_seller",
    })
    const { runContractFunction: gets_escrowComplete } = useWeb3Contract({
        abi: abi_logic,
        functionName: "s_escrowComplete",
    })
    const { runContractFunction: getInitilizeState } = useWeb3Contract({
        abi: abi_logic,

        functionName: "getInitilizeState",
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
        let anyEscrowsFromCall
        if (buyerState) {
            anyEscrowsFromCall = await getBuyerEscrows()
            setPreviousEscrowsBuyer(anyEscrowsFromCall)
        }
        if (!buyerState) {
            anyEscrowsFromCall = await getSellerEscrows()
            setPreviousEscrowsSeller(anyEscrowsFromCall)
        }
        if (!anyEscrowsFromCall || anyEscrowsFromCall.length === 0) {
            setAnyEscrows("No current escrows")
            setCurrentEscrow("No current escrows")
            setShowInputFields(true)
        } else {
            const latestEscrow = anyEscrowsFromCall[anyEscrowsFromCall.length - 1]
            setAnyEscrows(latestEscrow)
            if (
                anyEscrows != "No current escrows" &&
                currentEscrow != "Creating new escrow contract"
            ) {
                setShowInputFields(false)
            }

            if (currentEscrow == "No current escrows") {
                setCurrentEscrow(anyEscrows)
            }
            if (currentEscrow == "Initial") {
                setCurrentEscrow(latestEscrow)
            }

            // Ensure that the contract address is valid before calling getEscrowBalance
            if (currentEscrow && ethers.isAddress(currentEscrow)) {
                const balanceFromCall = await getEscrowBalance({
                    params: { contractAddress: currentEscrow },
                })
                const token = await getEscrowToken({
                    params: { contractAddress: currentEscrow },
                })
                const i_seller = await geti_seller({ params: { contractAddress: currentEscrow } })
                const i_buyer = await geti_buyer({ params: { contractAddress: currentEscrow } })

                const _amount = await geti_amount({ params: { contractAddress: currentEscrow } })
                const i_amount = _amount
                const initializeState = await getInitilizeState({
                    params: { contractAddress: currentEscrow },
                })
                if (initializeState) {
                    setInitializeStateString("True")
                } else {
                    setInitializeStateString("False")
                }
                setInitializeState(initializeState)
                const paymentStatus = await getCheckPayment({
                    params: { contractAddress: currentEscrow, params: { account: account } },
                })
                console.log("amount: " + _amount)
                console.log("payment" + paymentStatus)
                let i_amount2 = _amount.mul(2)
                const escrow_ended = await gets_escrowComplete({
                    params: { contractAddress: currentEscrow },
                })

                if (escrow_ended) {
                    setIsEscrowEnded(true)
                    setEscrowStatus("Ended")
                }
                if (!escrow_ended) {
                    setIsEscrowEnded(false)
                    setEscrowStatus("Live")
                }
                if (paymentStatus > 0) {
                    setIsFunded(true)
                    setIsFunding(false)
                } else {
                    setIsFunded(false)
                    setIsWithdrawing(false)
                }
                console.log("funded?: " + isFunded)

                const decisions = await getDecisions()

                if (decisions[0] == 0) {
                    setDecisionBuyer("Decline")
                    if (ethers.getAddress(account) == ethers.getAddress(i_buyer)) {
                        setIsDeclining(false)
                    }
                }
                if (decisions[0] == 1) {
                    setDecisionBuyer("Accept")
                    if (ethers.getAddress(account) == ethers.getAddress(i_buyer)) {
                        setIsAccepting(false)
                    }
                }
                if (decisions[0] == 2) {
                    setDecisionBuyer("Refund")
                    if (ethers.getAddress(account) == ethers.getAddress(i_buyer)) {
                        setIsRefunding(false)
                    }
                }

                if (decisions[1] == 0) {
                    setDecisionSeller("Decline")
                    if (ethers.getAddress(account) == ethers.getAddress(i_seller)) {
                        setIsDeclining(false)
                    }
                }
                if (decisions[1] == 1) {
                    setDecisionSeller("Accept")
                    if (ethers.getAddress(account) == ethers.getAddress(i_seller)) {
                        setIsAccepting(false)
                    }
                }
                if (decisions[1] == 2) {
                    setDecisionSeller("Refund")
                    if (ethers.getAddress(account) == ethers.getAddress(i_seller)) {
                        setIsRefunding(false)
                    }
                }

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
        currentEscrow,
        isFunded,
        buyerState,
        showInputFields,
        isApproved,
    ])
    const checkApproval = async () => {
        if (ethers.getAddress(account) == i_buyer) {
            try {
                const approvedAmount = await allowance({
                    params: { params: { owner: account, spender: currentEscrow } },
                })
                console.log("Approved amount and i_amount: " + approvedAmount + " " + i_amount2)
                if (approvedAmount >= i_amount2) {
                    setIsApproved(true)
                    setIsApproving(false)
                } else {
                    setIsApproved(false)
                }
            } catch (error) {
                console.log("Approved amount and i_amount: " + approvedAmount + " " + i_amount2)

                console.error("Error checking approval:", error)
            }
        }
        if (ethers.getAddress(account) == i_seller) {
            try {
                const approvedAmount = await allowance({
                    params: { params: { owner: account, spender: currentEscrow } },
                })
                if (approvedAmount >= i_amount) {
                    setIsApproved(true)
                    setIsApproving(false)
                } else {
                    setIsApproved(false)
                }
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
                setShowInputFields(false)
                console.log("Seller:", seller)
                console.log("Amount:", amount)
                console.log("Token Contract:", tokenContract)
                console.log("Balance:", balance)
                console.log("escrow:", currentEscrow)
            } catch (error) {
                console.error("Error occurred:", error)
            }
        }
    }
    const startEscrowButtonNew = async () => {
        setCurrentEscrow("Creating new escrow contract")

        setShowInputFields(true)
    }

    const fundButton = async () => {
        // Call your contract function here using the inputs as parameters
        setIsFunding(true)

        try {
            await initialize({
                onSuccess: () => {
                    handlesuccess
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsFunding(false)
                },
            })
            console.log("Seller:", seller)
            console.log("Amount:", amount)
            console.log("Token Contract:", tokenContract)
            console.log("Balance:", balance)
            console.log("escrow:", anyEscrows)
        } catch (error) {
            console.error("Error occurred:", error)
            setIsFunding(false)
        }
    }
    const withdrawButton = async () => {
        // Call your contract function here using the inputs as parameters
        setIsWithdrawing(true)

        try {
            await withdraw({
                onSuccess: () => {
                    handlesuccess
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsWithdrawing(false)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsWithdrawing(false)
        }
    }
    const buyerStateButton = async () => {
        // Call your contract function here using the inputs as parameters

        if (buyerState) {
            setBuyerState(false)
        } else {
            setBuyerState(true)
        }
    }

    const approveButton = async () => {
        // Call your contract function here using the inputs as parameters
        console.log(ethers.getAddress(account))
        console.log(ethers.getAddress(i_buyer))
        setIsApproving(true)
        if (ethers.getAddress(account) == i_buyer) {
            try {
                await approve({
                    onSuccess: () => {
                        handlesuccess
                    },
                    onError: (error) => {
                        console.error("Error occurred:", error), setIsApproving(false)
                    },
                })
            } catch (error) {
                console.error("Error occurred:", error)
                setIsApproving(false)
            }
        }
        if (ethers.getAddress(account) == i_seller) {
            try {
                await approve2({
                    onSuccess: () => {
                        handlesuccess
                    },
                    onError: (error) => {
                        console.error("Error occurred:", error), setIsApproving(false)
                    },
                })
            } catch (error) {
                console.error("Error occurred:", error)
                setIsApproving(false)
            }
        }
    }
    const acceptButton = async () => {
        setIsAccepting(true)

        try {
            await finishEscrow({
                params: { params: { decision: 1 } },
                onSuccess: () => {
                    handlesuccess
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsAccepting(false)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsAccepting(false)
        }
    }
    const declineButton = async () => {
        // Call your contract function here using the inputs as parameters
        setIsDeclining(true)

        try {
            await finishEscrow({
                params: { params: { decision: 0 } },
                onSuccess: () => {
                    handlesuccess
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsDeclining(false)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsDeclining(true)
        }
    }
    const refundButton = async () => {
        // Call your contract function here using the inputs as parameters
        setIsRefunding(true)

        try {
            await finishEscrow({
                params: { params: { decision: 2 } },
                onSuccess: () => {
                    handlesuccess
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsRefunding(false)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsRefunding(false)
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
    const getEscrowStatus = async function () {
        let return_
        if (isEscrowEnded) {
            return_ = "ended"
        }
        if (!isEscrowEnded) {
            return_ = "live"
        }
        return return_
    }

    return (
        <div className="p-5">
            {isWeb3Enabled ? (
                <>
                    Hi from Decentralized escrow! {anyEscrows} previous buyer:
                    {escrowAddress ? (
                        <div className="mb-4">
                            <div className=" text-lg font-bold mt-4">Current escrow</div>
                            <div className="flex  items-center">
                                <div
                                    className="cursor-pointer bg-gray-200 rounded-lg p-2 my-2 inline-block "
                                    onClick={() => {
                                        setDropdownOpen(!dropdownOpen)
                                    }}
                                >
                                    {currentEscrow}
                                </div>
                                {anyEscrows != "No current escrows" && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white  text-sm ml-2 font-bold py-2 px-4 rounded ml-right flex items-center justify-center"
                                        onClick={startEscrowButtonNew}
                                        disabled={isLoading || isFetching}
                                    >
                                        New Escrow
                                    </button>
                                )}
                            </div>
                            {dropdownOpen && buyerState && (
                                <div className="origin-top-right absolute ml-right mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="py-1 overflow-y-auto"
                                        style={{ maxHeight: "200px" }}
                                    >
                                        {" "}
                                        {/* Adjust maxHeight as needed */}
                                        {previousEscrowsBuyer
                                            .slice()
                                            .reverse()
                                            .map((address, index, array) => (
                                                <div
                                                    key={address}
                                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        setCurrentEscrow(address)
                                                        setDropdownOpen(false)
                                                        setShowInputFields(false)
                                                    }}
                                                >
                                                    {address}{" "}
                                                    {index === 0 && ( // Changed from array.length - 1 to 0 for the first item
                                                        <span className="text-green-500 text-xs ml-4">
                                                            Latest
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                            {dropdownOpen && !buyerState && (
                                <div className="origin-top-right absolute ml-right mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="py-1 overflow-y-auto"
                                        style={{ maxHeight: "200px" }}
                                    >
                                        {" "}
                                        {/* Adjust maxHeight as needed */}
                                        {previousEscrowsSeller
                                            .slice()
                                            .reverse()
                                            .map((address, index, array) => (
                                                <div
                                                    key={address}
                                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        setCurrentEscrow(address)
                                                        setDropdownOpen(false)
                                                        setShowInputFields(false)
                                                    }}
                                                >
                                                    {address}{" "}
                                                    {index === 0 && ( // Changed from array.length - 1 to 0 for the first item
                                                        <span className="text-green-500 text-xs ml-4">
                                                            Latest
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                            {currentEscrow != "Creating new escrow contract" &&
                                !isEscrowEnded &&
                                currentEscrow != "No current escrows" && (
                                    <div>Escrow initialized: {initializeStateString}</div>
                                )}
                            {buyerState ? (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-right mr-4 flex items-center justify-center"
                                    onClick={buyerStateButton}
                                >
                                    Buyer
                                </button>
                            ) : (
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-right mr-4 flex items-center justify-center"
                                    onClick={buyerStateButton}
                                >
                                    Seller
                                </button>
                            )}
                            <div className="mb-4"></div>
                            {(anyEscrows == "No current escrows" ||
                                currentEscrow == "Creating new escrow contract") &&
                                buyerState &&
                                showInputFields && (
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
                            {/* Escrow Information */}
                            {anyEscrows != "No current escrows" &&
                                !showInputFields &&
                                currentEscrow != "Creating new escrow contract" && (
                                    <>
                                        <div>Escrow balance: {balance / 10 ** 18}</div>
                                        <div>Token contract: {getTokenContract}</div>
                                        <div>Seller address: {i_seller}</div>
                                        <div>Buyer address: {i_buyer}</div>
                                        <div>Escrow amount: {i_amount / 10 ** 18}</div>
                                    </>
                                )}
                            {/* Conditional Buttons */}
                            {!isApproved &&
                                anyEscrows != "No current escrows" &&
                                !isFunded &&
                                !isEscrowEnded &&
                                !showInputFields &&
                                currentEscrow != "Creating new escrow contract" && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-right mr-4 mt-4  flex items-center justify-center"
                                        onClick={approveButton}
                                        disabled={isLoading || isFetching}
                                    >
                                        {isApproving ? (
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
                            {isApproved &&
                                anyEscrows != "No current escrows" &&
                                !isFunded &&
                                !isEscrowEnded &&
                                !showInputFields && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-right mr-4 mt-4 flex items-center justify-center"
                                        onClick={fundButton}
                                        disabled={isLoading || isFetching}
                                    >
                                        {isFunding ? (
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
                            {anyEscrows != "No current escrows" &&
                                isFunded &&
                                !isEscrowEnded &&
                                !initializeState &&
                                !showInputFields && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded ml-right mr-4 flex items-center justify-center"
                                        onClick={withdrawButton}
                                        disabled={isLoading || isFetching}
                                    >
                                        {isWithdrawing ? (
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
                                            "Withdraw"
                                        )}
                                    </button>
                                )}
                            <div className="flex">
                                {anyEscrows != "No current escrows" &&
                                    isFunded &&
                                    initializeState &&
                                    !isEscrowEnded &&
                                    !showInputFields && (
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded ml-right mr-4 flex items-center justify-center"
                                            onClick={acceptButton}
                                            disabled={
                                                ethers.getAddress(account) ==
                                                ethers.getAddress(i_buyer)
                                                    ? isLoading ||
                                                      isFetching ||
                                                      decisionBuyer == "Accept"
                                                    : isLoading ||
                                                      isFetching ||
                                                      decisionSeller == "Accept"
                                            }
                                        >
                                            {isAccepting ? (
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
                                                "Accept"
                                            )}
                                        </button>
                                    )}
                                {anyEscrows != "No current escrows" &&
                                    isFunded &&
                                    initializeState &&
                                    !isEscrowEnded &&
                                    !showInputFields && (
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded ml-right mr-4 flex items-center justify-center"
                                            onClick={declineButton}
                                            disabled={
                                                ethers.getAddress(account) ==
                                                ethers.getAddress(i_buyer)
                                                    ? isLoading ||
                                                      isFetching ||
                                                      decisionBuyer == "Decline"
                                                    : isLoading ||
                                                      isFetching ||
                                                      decisionSeller == "Decline"
                                            }
                                        >
                                            {isDeclining ? (
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
                                                "Decline"
                                            )}
                                        </button>
                                    )}
                                {anyEscrows != "No current escrows" &&
                                    isFunded &&
                                    !isEscrowEnded &&
                                    initializeState &&
                                    !showInputFields && (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded ml-right mr-4 flex items-center justify-center"
                                            onClick={refundButton}
                                            disabled={
                                                isLoading ||
                                                isFetching ||
                                                (ethers.getAddress(account) ===
                                                    ethers.getAddress(i_buyer) &&
                                                    decisionBuyer === "Refund") ||
                                                (ethers.getAddress(account) ===
                                                    ethers.getAddress(i_seller) &&
                                                    decisionSeller === "Refund")
                                            }
                                        >
                                            {isRefunding ? (
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
                                                "Refund"
                                            )}
                                        </button>
                                    )}
                            </div>
                            {(currentEscrow != "No current escrows" ||
                                anyEscrows != "No current escrows") &&
                                currentEscrow != "Creating new escrow contract" && (
                                    <div className="mt-4">Escrow status: {escrowStatus}</div>
                                )}
                            <div className="flex">
                                {(currentEscrow != "No current escrows" ||
                                    anyEscrows != "No current escrows") &&
                                    currentEscrow != "Creating new escrow contract" &&
                                    initializeState && <div>Buyer decision: {decisionBuyer}</div>}
                                {(currentEscrow != "No current escrows" ||
                                    anyEscrows != "No current escrows") &&
                                    initializeState &&
                                    currentEscrow != "Creating new escrow contract" && (
                                        <div className="ml-4">
                                            Seller decision: {decisionSeller}
                                        </div>
                                    )}
                            </div>
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
