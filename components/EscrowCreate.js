import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification, Icon } from "web3uikit"
import { Bell } from "@web3uikit/icons"
import TokenInput from "./TokenInput"

const abi_factory = require("../constants1/abi_factory.json") // Adjust the path to your ABI file
const abi_logic = require("../constants1/abi_logic.json") // Adjust the path to your ABI file
const escrowAddress = require("../constants1/escrowAddress.json")
const abi_ERC20 = require("../constants1/abi_ERC20.json")

export default function EscrowFactory() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()

    //console.log(parseInt(chainIdHex))
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
    const [tokenDecimals, setTokenDecimals] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")

    const [isApproving, setIsApproving] = useState(false)
    const [isTokenValid, setIsTokenValid] = useState()
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
            if (getTokenContract) {
                getTokenSymbol()
            }
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
        showInputFields,
        isApproved,
    ])
    useEffect(() => {
        if (isWeb3Enabled) {
            fixCurrentEscrow()
        }
    }, [isWeb3Enabled, buyerState, account, anyEscrows])

    async function getTokenSymbol() {
        const symbol = await checkToken3({ params: { contractAddress: getTokenContract } })
        const decimals = await checkToken1({ params: { contractAddress: getTokenContract } })
        const name = await checkToken2({ params: { contractAddress: getTokenContract } })
        setTokenSymbol(symbol)
        setTokenDecimals(decimals)
        setTokenName(name)
    }

    async function fixCurrentEscrow() {
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
            setCurrentEscrow(latestEscrow)

            if (currentEscrow == "No current escrows") {
                setCurrentEscrow(anyEscrows)
            }
            if (currentEscrow == "Initial") {
                setCurrentEscrow(latestEscrow)
            }
        }
    }

    const checkApproval = async () => {
        if (ethers.getAddress(account) == i_buyer) {
            try {
                const approvedAmount = await allowance({
                    params: { params: { owner: account, spender: currentEscrow } },
                })

                if (approvedAmount >= i_amount2) {
                    setIsApproved(true)
                    setIsApproving(false)
                } else {
                    setIsApproved(false)
                }
            } catch (error) {
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
    const handlesuccessNewEscrow = async function (tx) {
        await tx.wait(1)
        setShowInputFields(false)
        handleNewNotification(tx)
        updateUI()
    }
    const handleTokenValidation = (isValid) => {
        setIsTokenValid(isValid)
    }
    const handleTokenSymbol = (symbol) => {
        setTokenSymbol(symbol)
    }
    const startEscrowButton = async () => {
        // Call your contract function here using the inputs as parameters
        if (!ethers.isAddress(seller)) {
            console.error("Invalid seller contract address")
            return
        }
        if (ethers.getAddress(seller) == ethers.getAddress(account)) {
            console.error("You can not be both buyer and seller")
            return
        }
        if (!ethers.isAddress(tokenContract)) {
            console.error("Invalid token contract address")
            return
        }

        if (amountInput >= 0) {
            try {
                await escrowFactory({
                    onSuccess: handlesuccessNewEscrow,
                    onError: (error) => console.error("Error occurred:", error),
                })
            } catch (error) {
                console.error("Error occurred:", error)
            }
        }
    }
    const startEscrowButtonNew = () => {
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
    const buyerStateButton = () => {
        if (buyerState) {
            setBuyerState(false)
        } else {
            setBuyerState(true)
        }
    }

    const approveButton = async () => {
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
                    {escrowAddress ? (
                        <div className="fixed inset-0  z-50 flex justify-center items-end md:items-center">
                            <div className="relative bg-gray-100 p-4  border-2 rounded shadow-lg w-full md:w-1/2 lg:w-1/4 h-2/3  rounded-3xl">
                                <div className=" text-lg text-gray-700 ml-1 font-bold ">
                                    Current escrow
                                </div>
                                <div className="flex  items-center">
                                    <div
                                        className={` mt-1 bg-gray-200 rounded-xl w-full py-3 p-2 my-2 inline-block ${
                                            currentEscrow == "No current escrows" ||
                                            currentEscrow == "Creating new escrow contract"
                                                ? currentEscrow == "Creating new escrow contract"
                                                    ? "cursor-pointer font-medium  text-gray-500"
                                                    : "font-medium  text-gray-500"
                                                : "cursor-pointer font-medium  text-gray-700"
                                        }`}
                                        onClick={() => {
                                            setDropdownOpen(!dropdownOpen)
                                        }}
                                        disabled={currentEscrow == "No current escrows"}
                                    >
                                        {currentEscrow}
                                    </div>
                                    {anyEscrows != "No current escrows" && buyerState && (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white  text-sm ml-1 font-bold py-3.5  mb-1 px-4 rounded-xl  "
                                            onClick={startEscrowButtonNew}
                                            disabled={isLoading || isFetching}
                                        >
                                            New
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
                                {buyerState ? (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 rounded-xl mb-2 text-sm text-white font-bold py-2 px-4 rounded"
                                        onClick={buyerStateButton}
                                    >
                                        Buyer
                                    </button>
                                ) : (
                                    <button
                                        className="bg-red-500 hover:bg-red-700 rounded-xl mb-2 text-sm text-white font-bold py-2 px-4 rounded"
                                        onClick={buyerStateButton}
                                    >
                                        Seller
                                    </button>
                                )}
                                {/* Escrow Information */}
                                {currentEscrow != "Creating new escrow contract" &&
                                    !isEscrowEnded &&
                                    currentEscrow != "No current escrows" && (
                                        <div>
                                            <div className="flex items-center mb-2 ">
                                                <div className="flex w-full rounded ml-auto  py-2 px-4   rounded-xl text-gray-700 bg-white border-2 items-center">
                                                    <div className=" font-bold text-sm">
                                                        Escrow initialized
                                                    </div>
                                                    <div className="font-medium ml-2 text-sm  ">
                                                        {initializeStateString}
                                                    </div>
                                                </div>
                                                <div className="flex w-full rounded ml-auto  py-2 px-4  ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Escrow balance
                                                    </div>
                                                    <div className="font-medium ml-2 text-sm">
                                                        {balance / 10 ** 18}
                                                    </div>
                                                    <div className=" font-medium ml-1 text-sm">
                                                        {tokenSymbol}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" w-full rounded ml-auto  py-3 px-4 mb-2   rounded-xl text-gray-700 bg-white border-2 items-center">
                                                <div className=" font-bold text-sm ">
                                                    Seller address
                                                </div>
                                                <div className="font-normal  text-lg  ">
                                                    {i_seller}
                                                </div>
                                            </div>
                                            <div className=" w-full rounded ml-auto  py-3 px-4  mb-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                <div className=" font-bold text-sm ">
                                                    Token contract
                                                </div>
                                                <div className="font-normal  text-lg  ">
                                                    {getTokenContract}
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-1">
                                                <div className="flex w-full rounded ml-0.5  py-1 px-4   rounded-xl text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-sm">Name:</div>
                                                    <div className="font-medium ml-2 text-sm  ">
                                                        {tokenName}
                                                    </div>
                                                </div>
                                                <div className="flex w-full rounded   py-1 px-4  ml-1 rounded-xl text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Symbol:
                                                    </div>

                                                    <div className=" font-medium ml-2 text-sm">
                                                        {tokenSymbol}
                                                    </div>
                                                </div>
                                                <div className="flex w-full rounded  mr-0.5 py-1 px-4  ml-1 rounded-xl text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Decimals:
                                                    </div>

                                                    <div className=" font-medium ml-2 text-sm">
                                                        {tokenDecimals}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-10">
                                                <div className=" w-full rounded ml-auto  py-1 px-2  rounded-xl text-gray-700 bg-white border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Escrow status
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="font-normal  text-xl">
                                                            {escrowStatus}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" w-full rounded ml-auto  py-1 px-2  ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Escrow amount
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="font-normal  text-xl">
                                                            {i_amount / 10 ** 18}
                                                        </div>
                                                        <div className=" font-normal ml-1 text-xl">
                                                            {tokenSymbol}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" w-full rounded ml-auto  py-1 px-2 mr-0.5 ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Deposit amount
                                                    </div>
                                                    <div className="flex items-center">
                                                        {ethers.getAddress(account) ==
                                                        ethers.getAddress(i_seller) ? (
                                                            <div className="font-normal  text-xl">
                                                                {i_amount / 10 ** 18}
                                                            </div>
                                                        ) : (
                                                            <div className="font-normal  text-xl">
                                                                {(2 * i_amount) / 10 ** 18}
                                                            </div>
                                                        )}

                                                        <div className=" font-normal ml-1 text-xl">
                                                            {tokenSymbol}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {(anyEscrows == "No current escrows" ||
                                    currentEscrow == "Creating new escrow contract") &&
                                    buyerState &&
                                    showInputFields && (
                                        <>
                                            {/* Input fields */}
                                            <input
                                                className={`w-full rounded ml-auto  py-4 px-4 mb-2  rounded-xl focus:outline-none border-2 ${
                                                    ethers.isAddress(seller.trim()) || !seller
                                                        ? seller
                                                            ? ethers.getAddress(seller) !=
                                                              ethers.getAddress(account)
                                                                ? "font-medium"
                                                                : "border-red-400 font-medium"
                                                            : ""
                                                        : "border-red-400 font-medium"
                                                }`}
                                                type="text"
                                                value={seller}
                                                onChange={(e) => setSeller(e.target.value)}
                                                placeholder="Enter seller address"
                                                maxLength={42} // Ethereum addresses are 42 characters long
                                            />

                                            <div className="flex items-center border-2 rounded-xl bg-gray-200 rounded ml-auto mb-2">
                                                <input
                                                    className={`w-full py-4 px-4 rounded-xl focus:outline-none bg-white ${
                                                        amountInput ? "font-medium" : ""
                                                    }`}
                                                    type="text"
                                                    value={amountInput}
                                                    onChange={(e) =>
                                                        setAmountInput(
                                                            e.target.value.replace(/[^0-9]/g, ""),
                                                        )
                                                    }
                                                    placeholder="Enter escrow amount (How many tokens)"
                                                />
                                                <span
                                                    className={` font-medium text-gray-700 ${
                                                        tokenSymbol ? "px-3" : ""
                                                    }`}
                                                >
                                                    {tokenSymbol}
                                                </span>
                                            </div>
                                            <TokenInput
                                                setTokenContract={setTokenContract}
                                                onTokenValidation={handleTokenValidation}
                                                setTokenSymbolParent={handleTokenSymbol}
                                            />
                                            {isTokenValid ? (
                                                <div className="font-thin  text-xs text-gray-500 ml-1 mt-2 mb-2">
                                                    {tokenContract}
                                                </div>
                                            ) : (
                                                <div className="font-thin text-xs text-gray-500 ml-1 mt-2 mb-2 opacity-0">
                                                    Not a valid token
                                                </div>
                                            )}

                                            {/* Start Escrow Button */}
                                            <button
                                                className={`bg-blue-500  text-white  font-bold py-3 px-4 rounded-xl w-full flex items-center justify-center ${
                                                    isLoading ||
                                                    isFetching ||
                                                    (ethers.isAddress(seller)
                                                        ? ethers.getAddress(account) ==
                                                          ethers.getAddress(seller)
                                                        : true) ||
                                                    !seller ||
                                                    !amountInput ||
                                                    !tokenContract ||
                                                    !isTokenValid
                                                        ? "opacity-50 "
                                                        : "hover:bg-blue-700 "
                                                }`}
                                                onClick={startEscrowButton}
                                                disabled={
                                                    isLoading ||
                                                    isFetching ||
                                                    !seller ||
                                                    !amountInput ||
                                                    !tokenContract ||
                                                    !isTokenValid ||
                                                    (ethers.isAddress(seller)
                                                        ? ethers.getAddress(account) ==
                                                          ethers.getAddress(seller)
                                                        : true)
                                                }
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
                                {!isApproved &&
                                    anyEscrows != "No current escrows" &&
                                    !isFunded &&
                                    !isEscrowEnded &&
                                    !showInputFields &&
                                    currentEscrow != "Creating new escrow contract" && (
                                        <button
                                            className={`bg-blue-500 hover:bg-blue-700 w-full rounded-xl text-white font-bold py-2 px-4  ml-right mr-4 mt-4  flex items-center justify-center ${
                                                isLoading || isFetching || isApproving
                                                    ? "opacity-50 "
                                                    : ""
                                            }`}
                                            onClick={approveButton}
                                            disabled={isLoading || isFetching || isApproving}
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
                                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-xl ml-right mr-4 mt-4 flex items-center justify-center ${
                                                isLoading || isFetching || isFunding
                                                    ? "opacity-50 "
                                                    : ""
                                            }`}
                                            onClick={fundButton}
                                            disabled={isLoading || isFetching || isFunding}
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
                                            className={`bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 mt-4 w-full rounded-xl ml-right mr-4 flex items-center justify-center ${
                                                isLoading || isFetching || isWithdrawing
                                                    ? "opacity-50 "
                                                    : ""
                                            }`}
                                            onClick={withdrawButton}
                                            disabled={isLoading || isFetching || isWithdrawing}
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

                                {anyEscrows != "No current escrows" &&
                                    isFunded &&
                                    initializeState &&
                                    !isEscrowEnded &&
                                    !showInputFields && (
                                        <div>
                                            <div className=" flex items-center mt-2">
                                                <button
                                                    className={`bg-green-500 hover:bg-green-700 mr-2 w-full text-white font-bold py-2   rounded-xl   ${
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Accept" ||
                                                              isAccepting
                                                                ? "opacity-50  hover:bg-green-500"
                                                                : ""
                                                            : isLoading ||
                                                                isFetching ||
                                                                decisionSeller == "Accept" ||
                                                                isAccepting
                                                              ? "opacity-50  hover:bg-green-500"
                                                              : ""
                                                    }`}
                                                    onClick={acceptButton}
                                                    disabled={
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Accept" ||
                                                              isAccepting
                                                            : isLoading ||
                                                              isFetching ||
                                                              decisionSeller == "Accept" ||
                                                              isAccepting
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
                                                <button
                                                    className={`bg-red-500 hover:bg-red-700  w-full text-white font-bold py-2   rounded-xl ${
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Decline" ||
                                                              isDeclining
                                                                ? "opacity-50  hover:bg-red-500"
                                                                : ""
                                                            : isLoading ||
                                                                isFetching ||
                                                                decisionSeller == "Decline" ||
                                                                isDeclining
                                                              ? "opacity-50  hover:bg-red-500"
                                                              : ""
                                                    }`}
                                                    onClick={declineButton}
                                                    disabled={
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Decline" ||
                                                              isDeclining
                                                            : isLoading ||
                                                              isFetching ||
                                                              decisionSeller == "Decline" ||
                                                              isDeclining
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
                                            </div>
                                            <button
                                                className={`bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 mt-2  rounded-xl ${
                                                    i_buyer &&
                                                    ethers.isAddress(i_buyer) &&
                                                    ethers.getAddress(account) ===
                                                        ethers.getAddress(i_buyer)
                                                        ? isLoading ||
                                                          isFetching ||
                                                          decisionBuyer == "Refund" ||
                                                          isRefunding
                                                            ? "opacity-50  hover:bg-blue-500"
                                                            : ""
                                                        : isLoading ||
                                                            isFetching ||
                                                            decisionSeller == "Refund" ||
                                                            isRefunding
                                                          ? "opacity-50  hover:bg-blue-500"
                                                          : ""
                                                }`}
                                                onClick={refundButton}
                                                disabled={
                                                    i_buyer &&
                                                    ethers.isAddress(i_buyer) &&
                                                    ethers.getAddress(account) ===
                                                        ethers.getAddress(i_buyer)
                                                        ? isLoading ||
                                                          isFetching ||
                                                          decisionBuyer == "Refund" ||
                                                          isRefunding
                                                        : isLoading ||
                                                          isFetching ||
                                                          decisionSeller == "Refund" ||
                                                          isRefunding
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
                                            <div className="flex items-center mt-1 text-sm">
                                                <div className=" w-full mr-2 rounded-xl  ml-0.2 font-medium flex items-center">
                                                    Buyer:
                                                    <div
                                                        className={`ml-1 ${
                                                            decisionBuyer == "Decline"
                                                                ? "text-red-600"
                                                                : decisionBuyer == "Accept"
                                                                  ? "text-green-600"
                                                                  : "text-blue-600"
                                                        }`}
                                                    >
                                                        {decisionBuyer}
                                                    </div>
                                                </div>

                                                <div className=" w-full rounded-xl ml-24 px-14 font-medium flex">
                                                    Seller:{" "}
                                                    <div
                                                        className={`ml-1 ${
                                                            decisionSeller == "Decline"
                                                                ? "text-red-600"
                                                                : decisionSeller == "Accept"
                                                                  ? "text-green-600"
                                                                  : "text-blue-600"
                                                        }`}
                                                    >
                                                        {decisionSeller}
                                                    </div>
                                                </div>
                                            </div>
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
