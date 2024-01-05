import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification, Icon } from "web3uikit"
import { Bell } from "@web3uikit/icons"
import TokenInput from "./TokenSelectModal"
import EscrowDropdownModal from "./OldEscrowsModal"
import Questionmark from "../svgs/question-mark"
import Copy from "../svgs/copy"
import BigNumber from "bignumber.js"

const abi_factory = require("../constants1/abi_factory.json") // Adjust the path to your ABI file
const abi_logic = require("../constants1/abi_logic.json") // Adjust the path to your ABI file
const escrowAddress = require("../constants1/escrowAddress.json")
const abi_ERC20 = require("../constants1/abi_ERC20.json")

export default function EscrowFactory() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()

    //console.log(parseInt(chainIdHex))
    let chainId = parseInt(chainIdHex)
    let latest_address = chainId in escrowAddress ? escrowAddress[chainId].length : null
    let factoryAddress =
        chainId in escrowAddress ? escrowAddress[chainId][latest_address - 1] : null

    const dispatch = useNotification()
    //değerin durmadan renderlanması için useState variable olmalı aşağıdaki gibi

    //     variable       function             starting value
    const [anyEscrows, setAnyEscrows] = useState("")
    const [currentEscrow, setCurrentEscrow] = useState("Initial")

    const [seller, setSeller] = useState("")
    const [amountInput, setAmountInput] = useState("")
    const [modalOpen, setModalOpen] = useState(false)

    const [i_amount, seti_amount] = useState("0")
    const [i_amount2, seti_amount2] = useState("0")
    const [i_amount_check, seti_amount_check] = useState("0")
    const [i_amount2_check, seti_amount2_check] = useState("0")
    const [isApproved, setIsApproved] = useState(false)
    const [isFunded, setIsFunded] = useState(false)

    const [tokenBalance, setTokenBalance] = useState("")

    const [decisionBuyer, setDecisionBuyer] = useState("None")
    const [decisionSeller, setDecisionSeller] = useState("None")

    const [isAccepting, setIsAccepting] = useState(false)
    const [isDeclining, setIsDeclining] = useState(false)
    const [isRefunding, setIsRefunding] = useState(false)
    const [isEscrowEnded, setIsEscrowEnded] = useState(false)
    const [escrowStatus, setEscrowStatus] = useState("")
    const [isCopied, setIsCopied] = useState(false)
    const [isCopied2, setIsCopied2] = useState(false)

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
    const { runContractFunction: balanceOf } = useWeb3Contract({
        abi: abi_ERC20,

        functionName: "balanceOf",
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
        chainId = parseInt(chainIdHex)
        latest_address = chainId in escrowAddress ? escrowAddress[chainId].length : null
        factoryAddress =
            chainId in escrowAddress ? escrowAddress[chainId][latest_address - 1] : null

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

                let i_amount = "0"
                if (_amount != null) {
                    i_amount = new BigNumber(_amount.toString(10)).toString()
                }

                let i_amount2 = 0
                if (_amount != null) {
                    i_amount2 = new BigNumber(_amount.toString(10)).multipliedBy(2).toString()
                }

                const i_amount_check = _amount
                let i_amount2_check = _amount.mul(2)
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

                if (decisions) {
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
                }

                seti_buyer(i_buyer)
                seti_amount(i_amount)
                seti_amount_check(i_amount_check)
                seti_amount2(i_amount2)
                seti_amount2_check(i_amount2_check)
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
        i_amount2_check,
        i_amount_check,
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
            checkBalance(tokenContract)
        }
    }, [isWeb3Enabled, buyerState, account, anyEscrows, chainId])

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

                if (approvedAmount >= i_amount2_check) {
                    setIsApproved(true)
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
                if (approvedAmount >= i_amount_check) {
                    setIsApproved(true)
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
    const handleSelectEscrow = (address) => {
        setCurrentEscrow(address)
        setModalOpen(false)
        // Other actions to handle after selecting an escrow
    }
    const handlesuccess = async function (tx) {
        await tx.wait(1)
        setIsApproving(false)
        handleNewNotification(tx)
        updateUI()
    }
    const handleTokenValidation = (isValid) => {
        setIsTokenValid(isValid)
    }
    const handleTokenSymbol = (symbol) => {
        setTokenSymbol(symbol)
    }
    async function checkBalance(address) {
        const balance = await balanceOf({
            params: {
                contractAddress: address,
                params: { account: account },
            },
        })

        let balance_bigint
        if (balance != null) {
            balance_bigint = new BigNumber(balance.toString(10))
        }
        setTokenBalance(balance_bigint)
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
                    onSuccess: (tx) => {
                        handlesuccessNewEscrow(tx)
                    },
                    onError: (error) => console.error("Error occurred:", error),
                })
            } catch (error) {
                console.error("Error occurred:", error)
            }
        }
    }
    const startEscrowButtonNew = async function () {
        setCurrentEscrow("Creating new escrow contract")

        setShowInputFields(true)
    }

    const fundButton = async () => {
        // Call your contract function here using the inputs as parameters
        setIsFunding(true)

        try {
            await initialize({
                onSuccess: (tx) => {
                    handlesuccess(tx)
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
                onSuccess: (tx) => {
                    handlesuccess(tx)
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
                    onSuccess: (tx) => {
                        handlesuccess(tx)
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
                console.log("amouınt" + i_amount)
                await approve2({
                    onSuccess: (tx) => {
                        handlesuccess(tx)
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
                onSuccess: (tx) => {
                    handlesuccess(tx)
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
                onSuccess: (tx) => {
                    handlesuccess(tx)
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
                onSuccess: (tx) => {
                    handlesuccess(tx)
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
    const copyToClipboard = async (variable) => {
        const input = document.createElement("input")
        // Set its value to the text that you want to copy
        input.value = variable
        // Append it to the document
        document.body.appendChild(input)
        // Select the text inside the input element
        input.select()
        // Copy the selected text to the clipboard
        document.execCommand("copy")
        // Remove the temporary input from the document
        document.body.removeChild(input)
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

    const handleTokenSelect = (address) => {
        setTokenContract(address)
        checkBalance(address)
    }

    return (
        <div className=" p-1 w-full">
            {isWeb3Enabled ? (
                <>
                    {factoryAddress ? (
                        <div className="   flex justify-center  mb-16">
                            <div className="relative bg-gray-100 p-4   w-full wdefined:w-[480px] border-2 custom-shadow max-h-[613px] rounded-3xl">
                                {buyerState ? (
                                    <div className="flex items-center">
                                        <button
                                            className="bg-gray-300 rounded-xl mb-2  font-medium text-gray-700  font-base py-2 px-4 "
                                            disabled={buyerState}
                                        >
                                            Buyer
                                        </button>
                                        <button
                                            onClick={buyerStateButton}
                                            className="  rounded-xl mb-2  hover:bg-gray-200 transition duration-300 ease-in-out text-gray-700  py-2 px-4 "
                                        >
                                            Seller
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <button
                                            className="rounded-xl mb-2  text-gray-700  hover:bg-gray-200 transition duration-300 ease-in-out font-base py-2 px-4 "
                                            onClick={buyerStateButton}
                                        >
                                            Buyer
                                        </button>
                                        <button
                                            disabled={!buyerState}
                                            className="bg-gray-300  rounded-xl mb-2  text-gray-700 font-medium py-2 px-4 "
                                        >
                                            Seller
                                        </button>
                                    </div>
                                )}
                                <div className=" text-lg text-gray-700 ml-1 font-bold ">
                                    Current escrow
                                </div>
                                <div className="flex  items-center">
                                    <button
                                        className={` mt-1 bg-gray-200  rounded-xl overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm py-3 p-2 my-2 inline-block ${
                                            currentEscrow == "No current escrows" ||
                                            currentEscrow == "Creating new escrow contract"
                                                ? currentEscrow == "Creating new escrow contract"
                                                    ? "cursor-pointer font-medium  text-gray-500 hover:bg-gray-300 transition duration-300"
                                                    : "font-medium  text-gray-500"
                                                : "cursor-pointer font-medium  text-gray-700 hover:bg-gray-300 transition duration-300 ease-in-out"
                                        }`}
                                        onClick={() => {
                                            setModalOpen(true)
                                        }}
                                        disabled={currentEscrow == "No current escrows"}
                                    >
                                        {currentEscrow}
                                    </button>
                                    <div className="">
                                        {anyEscrows != "No current escrows" && buyerState && (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out  text-sm ml-1 font-bold py-3 mb-1 px-4 rounded-xl  "
                                                onClick={startEscrowButtonNew}
                                                disabled={isLoading || isFetching}
                                            >
                                                New
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {currentEscrow == "No current escrows" && !buyerState && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out rounded-xl w-full py-3 text-white font-bold"
                                        onClick={buyerStateButton}
                                    >
                                        Switch to buyer
                                    </button>
                                )}
                                <EscrowDropdownModal
                                    isOpen={modalOpen}
                                    escrows={
                                        buyerState ? previousEscrowsBuyer : previousEscrowsSeller
                                    }
                                    onSelectEscrow={handleSelectEscrow}
                                    onClose={() => setModalOpen(false)}
                                    isBuyer={buyerState}
                                />

                                {/* Escrow Information */}
                                {currentEscrow != "Creating new escrow contract" &&
                                    currentEscrow != "No current escrows" &&
                                    currentEscrow != "Initial" && (
                                        <div>
                                            <div className="flex items-center mb-2 ">
                                                <div className="flex w-full relative group">
                                                    <div className="flex w-full rounded ml-auto cursor-pointer py-2 px-4  justify-between rounded-xl text-gray-700 bg-white border-2 items-center">
                                                        <div className="flex ">
                                                            <div className=" font-bold text-sm ">
                                                                Initialized
                                                            </div>
                                                            <div className="opacity-30 ml-0.5 mt-0.5">
                                                                {" "}
                                                                <Questionmark />
                                                            </div>
                                                        </div>
                                                        <div className="font-medium ml-2 text-sm  ">
                                                            {initializeStateString}
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-full left-0  hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                        {/* Info bar content */}
                                                        <p className="text-gray-500 text-xs ">
                                                            Escrow is initialized after{" "}
                                                            <span className="font-bold ">
                                                                both parties
                                                            </span>{" "}
                                                            deposit the required funds to the
                                                            contract. Funds are{" "}
                                                            <span className="font-bold ">
                                                                withdrawable
                                                            </span>{" "}
                                                            before the initialization.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex w-full relative group">
                                                    <div className="flex w-full rounded ml-auto cursor-pointer justify-between py-2 px-4  ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                        <div className="flex ">
                                                            <div className=" font-bold text-sm ">
                                                                Balance
                                                            </div>
                                                            <div className="opacity-30 ml-0.5 mt-0.5">
                                                                <Questionmark />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center ml-4">
                                                            <div className="font-medium  text-sm">
                                                                {BigNumber(balance)
                                                                    .dividedBy(
                                                                        BigNumber("10").pow(18),
                                                                    )
                                                                    .toString()}
                                                            </div>
                                                            <div className=" font-medium ml-3 text-sm">
                                                                {tokenSymbol}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-full left-0  hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                        {/* Info bar content */}
                                                        <p className="text-gray-500 text-xs">
                                                            Current balance of the contract. The
                                                            total balance of the contract should be{" "}
                                                            <span className="font-bold ">
                                                                three times
                                                            </span>{" "}
                                                            the escrow amount before
                                                            initialization. (with safety deposits)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {ethers.getAddress(account) == i_seller ? (
                                                <div className=" w-full rounded ml-auto  py-3 px-4 mb-2  overflow-hidden text-ellipsis whitespace-nowrap rounded-xl text-gray-700 bg-white border-2 items-center">
                                                    <div className="flex items-center">
                                                        <div className=" font-bold text-sm ">
                                                            Buyer address
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                copyToClipboard(i_buyer)
                                                                setIsCopied(true)
                                                                setTimeout(
                                                                    () => setIsCopied(false),
                                                                    1000,
                                                                )
                                                            }}
                                                            className={`ml-1  hover:cursor-pointer transition duration-300 ease-in-out`}
                                                        >
                                                            {" "}
                                                            {isCopied ? (
                                                                <div className=" text-xxs  px-1  text-black opacity-50 ">
                                                                    Copied!
                                                                </div>
                                                            ) : (
                                                                <div className="opacity-30 hover:opacity-60 ">
                                                                    <Copy />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="font-normal  text-base  ">
                                                        {i_buyer}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className=" w-full rounded ml-auto  py-3 px-4 mb-2  overflow-hidden text-ellipsis whitespace-nowrap rounded-xl text-gray-700 bg-white border-2 items-center">
                                                    <div className="flex items-center">
                                                        <div className=" font-bold text-sm ">
                                                            Seller address
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                copyToClipboard(i_seller)
                                                                setIsCopied(true)
                                                                setTimeout(
                                                                    () => setIsCopied(false),
                                                                    1000,
                                                                )
                                                            }}
                                                            className={`ml-1  hover:cursor-pointer transition duration-300 ease-in-out`}
                                                        >
                                                            {" "}
                                                            {isCopied ? (
                                                                <div className=" text-xxs  px-1  text-black opacity-50 ">
                                                                    Copied!
                                                                </div>
                                                            ) : (
                                                                <div className="opacity-30 hover:opacity-60 ">
                                                                    <Copy />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="font-normal  text-base ">
                                                        {i_seller}
                                                    </div>
                                                </div>
                                            )}

                                            <div className=" w-full rounded ml-auto overflow-hidden text-ellipsis whitespace-nowrap py-3 px-4  mb-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                <div className="flex items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Token contract
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            copyToClipboard(getTokenContract)
                                                            setIsCopied2(true)
                                                            setTimeout(
                                                                () => setIsCopied2(false),
                                                                1000,
                                                            )
                                                        }}
                                                        className={`ml-1  hover:cursor-pointer transition duration-300 ease-in-out`}
                                                    >
                                                        {" "}
                                                        {isCopied2 ? (
                                                            <div className=" text-xxs  px-1  text-black opacity-50 ">
                                                                Copied!
                                                            </div>
                                                        ) : (
                                                            <div className="opacity-30 hover:opacity-60 ">
                                                                <Copy />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="font-normal  text-base  ">
                                                    {getTokenContract}
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-1">
                                                <div className="flex w-full rounded ml-0.5 p-0.5 justify-center rounded-lg text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-sm">Name:</div>
                                                    <div className="font-medium ml-2 text-sm  ">
                                                        {tokenName}
                                                    </div>
                                                </div>
                                                <div className="flex w-full rounded   justify-center ml-1 p-0.5 rounded-lg text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Symbol:
                                                    </div>

                                                    <div className=" font-medium ml-2 text-sm">
                                                        {tokenSymbol}
                                                    </div>
                                                </div>
                                                <div className="flex w-full rounded  mr-0.5 justify-center p-0.5 ml-1 rounded-lg text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-sm ">
                                                        Decimals:
                                                    </div>

                                                    <div className=" font-medium ml-2 text-sm">
                                                        {tokenDecimals}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" mt-7">
                                                <div className="flex mb-1 items-center text-sm">
                                                    <div className="  mr-2 rounded-xl  ml-1 font-medium flex items-center">
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

                                                    <div className="justify-end  w-96 rounded-xl mr-2  font-medium flex">
                                                        Seller:
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
                                                <div className="flex items-center ">
                                                    <div className="relative group w-full ">
                                                        <div className=" w-full rounded ml-auto  cursor-pointer py-1 px-2  rounded-xl text-gray-700 bg-white border-2 items-center">
                                                            <div className="flex ">
                                                                <div className=" font-bold text-sm ">
                                                                    Status
                                                                </div>
                                                                <div className="opacity-30 ml-0.5 mt-0.5">
                                                                    <Questionmark />
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <div className="font-normal  text-xl">
                                                                    {escrowStatus == "Live" ? (
                                                                        <div className="text-green-500">
                                                                            {escrowStatus}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-red-500 ">
                                                                            {escrowStatus}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-full left-0  w-64 hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                            {/* Info bar content */}
                                                            <p className="text-gray-500 text-xs">
                                                                Shows to status of the current
                                                                escrow contract. Escrow is ended
                                                                when{" "}
                                                                <span className="font-bold ">
                                                                    both parties agree
                                                                </span>{" "}
                                                                on the same decision, either{" "}
                                                                <span className="font-bold ">
                                                                    Accept
                                                                </span>{" "}
                                                                or{" "}
                                                                <span className="font-bold ">
                                                                    Refund
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="relative group w-full">
                                                        <div className=" w-full rounded ml-auto py-1 px-2 cursor-pointer ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                            <div className="flex ">
                                                                <div className=" font-bold text-sm ">
                                                                    Amount
                                                                </div>
                                                                <div className="opacity-30 ml-0.5 mt-0.5">
                                                                    <Questionmark />
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <div className="font-normal  text-xl">
                                                                    {BigNumber(i_amount)
                                                                        .dividedBy(
                                                                            BigNumber("10").pow(
                                                                                18,
                                                                            ),
                                                                        )
                                                                        .toString()}
                                                                </div>
                                                                <div className=" font-normal ml-1 text-xl">
                                                                    {tokenSymbol}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-full left-0   hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                            {/* Info bar content */}
                                                            <p className="text-gray-500 text-xs">
                                                                The{" "}
                                                                <span className="font-bold">
                                                                    transfer amount
                                                                </span>{" "}
                                                                after a successful escrow.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {escrowStatus != "Ended" && (
                                                        <div className="relative group w-full">
                                                            <div className=" w-full rounded ml-auto cursor-pointer py-1 px-2 mr-0.5 ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                                <div className="flex ">
                                                                    <div className=" font-bold text-sm ">
                                                                        Deposit
                                                                    </div>
                                                                    <div className="opacity-30 ml-0.5 mt-0.5">
                                                                        <Questionmark />
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    {i_seller &&
                                                                    ethers.getAddress(account) ==
                                                                        ethers.getAddress(
                                                                            i_seller,
                                                                        ) ? (
                                                                        <div className="font-normal  text-xl">
                                                                            {BigNumber(i_amount)
                                                                                .dividedBy(
                                                                                    BigNumber(
                                                                                        "10",
                                                                                    ).pow(18),
                                                                                )
                                                                                .toString()}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="font-normal  text-xl">
                                                                            {BigNumber(i_amount2)
                                                                                .dividedBy(
                                                                                    BigNumber(
                                                                                        "10",
                                                                                    ).pow(18),
                                                                                )
                                                                                .toString()}
                                                                        </div>
                                                                    )}

                                                                    <div className=" font-normal ml-1 text-xl">
                                                                        {tokenSymbol}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute bottom-full left-0  w-64  hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                                {/* Info bar content */}
                                                                <p className="text-gray-500 text-xs">
                                                                    The amount of tokens you need
                                                                    to deposit in order this
                                                                    contract to initialize after
                                                                    <span className="font-bold">
                                                                        {" "}
                                                                        mutual
                                                                    </span>{" "}
                                                                    deposits. This amount includes
                                                                    the{" "}
                                                                    <span className="font-bold text-blue-500">
                                                                        safety deposit
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
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
                                                className={`w-full rounded ml-auto  py-4 px-4 mb-5 rounded-xl focus:outline-none border-2 ${
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

                                            <div className="flex items-center border-2 rounded-xl bg-gray-200 rounded ml-auto mb-1">
                                                <input
                                                    className={`w-full py-4 px-4 rounded-xl focus:outline-none bg-white ${
                                                        amountInput ? "font-medium" : ""
                                                    }`}
                                                    type="text"
                                                    value={amountInput}
                                                    onChange={(e) =>
                                                        setAmountInput(
                                                            e.target.value.replace(/[^0-9.]/g, ""),
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

                                            <div className="flex justify-end text-xs text-gray-700 font-light mr-1 opacity-80">
                                                <div className="opacity-0">Balance:</div>
                                                {tokenBalance && (
                                                    <div className="flex">
                                                        <div className="mr-1">Balance:</div>
                                                        {BigNumber(tokenBalance)
                                                            .dividedBy(BigNumber("10").pow(18))
                                                            .toString()}
                                                    </div>
                                                )}
                                            </div>

                                            <TokenInput
                                                setTokenContract={handleTokenSelect}
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
                                                        : "hover:bg-blue-700 transition duration-300 ease-in-out"
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
                                                    <div className="text-white">Start Escrow</div>
                                                )}
                                            </button>
                                        </>
                                    )}

                                {/* Conditional Buttons */}
                                {!isApproved &&
                                    currentEscrow != "Initial" &&
                                    anyEscrows != "No current escrows" &&
                                    !isFunded &&
                                    !isEscrowEnded &&
                                    !showInputFields &&
                                    currentEscrow != "Creating new escrow contract" && (
                                        <button
                                            className={`bg-blue-500  w-full rounded-xl text-white font-bold py-2 px-4  ml-right mr-4 mt-4  flex items-center justify-center ${
                                                isLoading || isFetching || isApproving
                                                    ? "opacity-50 "
                                                    : "hover:bg-blue-700 transition duration-300 ease-in-out"
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
                                                <div className="text-white">Approve</div>
                                            )}
                                        </button>
                                    )}
                                {isApproved &&
                                    anyEscrows != "No current escrows" &&
                                    !isFunded &&
                                    !isEscrowEnded &&
                                    !showInputFields && (
                                        <button
                                            className={`bg-blue-500  text-white font-bold py-2 px-4 w-full rounded-xl ml-right mr-4 mt-4 flex items-center justify-center ${
                                                isLoading || isFetching || isFunding
                                                    ? "opacity-50 "
                                                    : "hover:bg-blue-700 transition duration-300 ease-in-out"
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
                                            ) : balance > 0 ? (
                                                "Fund and Initialize"
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
                                            className={`bg-blue-500  text-white  font-bold py-2 px-4 mt-4 w-full rounded-xl ml-right mr-4 flex items-center justify-center ${
                                                isLoading || isFetching || isWithdrawing
                                                    ? "opacity-50 "
                                                    : "hover:bg-blue-700 transition duration-300 ease-in-out"
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
                                                    className={`bg-green-500  mr-2 w-full text-white font-bold py-2   rounded-xl   ${
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Accept" ||
                                                              isAccepting
                                                                ? "opacity-50 "
                                                                : "hover:bg-green-700"
                                                            : isLoading ||
                                                                isFetching ||
                                                                decisionSeller == "Accept" ||
                                                                isAccepting
                                                              ? "opacity-50 "
                                                              : "hover:bg-green-700 transition duration-300 ease-in-out"
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
                                                            <div className="flex items-center justify-center">
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
                                                            </div>
                                                        </>
                                                    ) : (
                                                        "Accept"
                                                    )}
                                                </button>
                                                <button
                                                    className={`bg-red-500   w-full text-white font-bold py-2   rounded-xl ${
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Decline" ||
                                                              isDeclining
                                                                ? "opacity-50  "
                                                                : "hover:bg-red-700"
                                                            : isLoading ||
                                                                isFetching ||
                                                                decisionSeller == "Decline" ||
                                                                isDeclining
                                                              ? "opacity-50 "
                                                              : "hover:bg-red-700 transition duration-300 ease-in-out"
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
                                                            <div className="flex items-center justify-center">
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
                                                            </div>
                                                        </>
                                                    ) : (
                                                        "Decline"
                                                    )}
                                                </button>
                                            </div>
                                            <button
                                                className={`bg-blue-500  w-full text-white font-bold py-2 mt-2  rounded-xl ${
                                                    i_buyer &&
                                                    ethers.isAddress(i_buyer) &&
                                                    ethers.getAddress(account) ===
                                                        ethers.getAddress(i_buyer)
                                                        ? isLoading ||
                                                          isFetching ||
                                                          decisionBuyer == "Refund" ||
                                                          isRefunding
                                                            ? "opacity-50 "
                                                            : "hover:bg-blue-700"
                                                        : isLoading ||
                                                            isFetching ||
                                                            decisionSeller == "Refund" ||
                                                            isRefunding
                                                          ? "opacity-50 "
                                                          : "hover:bg-blue-700 transition duration-300 ease-in-out"
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
                                                        <div className="flex items-center justify-center">
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
                                                        </div>
                                                    </>
                                                ) : (
                                                    "Refund"
                                                )}
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    ) : (
                        <div className="   flex justify-center  mb-16">
                            {/* Wrong Network Decoys */}
                            <div
                                className="relative bg-gray-100 p-4   w-full wdefined:w-[480px] border-2 custom-shadow  max-h-[613px] rounded-3xl"
                                disabled={true}
                            >
                                {buyerState ? (
                                    <div className="flex items-center">
                                        <button
                                            className="bg-gray-300 rounded-xl mb-2  font-medium text-gray-700 cursor-not-allowed  font-base py-2 px-4 "
                                            disabled={true}
                                        >
                                            Buyer
                                        </button>
                                        <button
                                            disabled={true}
                                            className="  rounded-xl mb-2   text-gray-700 cursor-not-allowed py-2 px-4 "
                                        >
                                            Seller
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <button
                                            className="rounded-xl mb-2  text-gray-700  cursor-not-allowed font-base py-2 px-4 "
                                            disabled={true}
                                        >
                                            Buyer
                                        </button>
                                        <button
                                            disabled={true}
                                            className="bg-gray-300  rounded-xl mb-2 cursor-not-allowed text-gray-700 font-medium py-2 px-4 "
                                        >
                                            Seller
                                        </button>
                                    </div>
                                )}
                                <div className=" text-lg text-gray-700 ml-1 font-bold ">
                                    Current escrow
                                </div>
                                <div className="flex  items-center">
                                    <button
                                        className={` mt-1 bg-gray-200 rounded-xl overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm py-3 p-2 my-2 inline-block ${
                                            currentEscrow == "No current escrows" ||
                                            currentEscrow == "Creating new escrow contract"
                                                ? currentEscrow == "Creating new escrow contract"
                                                    ? "cursor-pointer font-medium  text-gray-500"
                                                    : "font-medium  text-gray-500"
                                                : "cursor-pointer font-medium  text-gray-700"
                                        }`}
                                        disabled={true}
                                    >
                                        {currentEscrow}
                                    </button>
                                    <div className="">
                                        {anyEscrows != "No current escrows" && buyerState && (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white  text-sm ml-1 font-bold py-3 mb-1 px-4 rounded-xl  "
                                                disabled={true}
                                            >
                                                New
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {currentEscrow == "No current escrows" && !buyerState && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out rounded-xl w-full py-3 text-white font-bold"
                                        onClick={buyerStateButton}
                                    >
                                        Switch to buyer
                                    </button>
                                )}
                                {buyerState && (
                                    <>
                                        <div className="w-full py-4 border-2 px-4 rounded-xl mb-5 bg-white cursor-not-allowed">
                                            <div className="text-gray-400">
                                                Enter seller address
                                            </div>
                                        </div>

                                        <div className="w-full py-4 border-2 px-4 rounded-xl mb-1 bg-white cursor-not-allowed">
                                            <div className="text-gray-400">
                                                Enter escrow amount (How many tokens)
                                            </div>
                                        </div>

                                        <div className="flex justify-end text-xs text-gray-700 font-light mr-1 opacity-80">
                                            <div className="opacity-0">Balance:</div>
                                            {tokenBalance && (
                                                <div className="flex">
                                                    <div className="mr-1">Balance:</div>
                                                    {BigNumber(tokenBalance)
                                                        .dividedBy(BigNumber("10").pow(18))
                                                        .toString()}
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full py-4 border-2 px-4 rounded-xl  bg-white cursor-not-allowed">
                                            <div className="text-gray-400">
                                                Select Token Contract
                                            </div>
                                        </div>

                                        <div className="font-thin  text-xs text-gray-500 ml-1 mt-2 mb-2 opacity-0">
                                            **
                                        </div>

                                        <button
                                            className={`bg-blue-500  text-white  font-bold py-3 px-4 rounded-xl w-full flex items-center justify-center opacity-50
                                                `}
                                            disabled={true}
                                        >
                                            Wrong Network
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="   flex justify-center  mb-16">
                    {/* Wallet not connected decoys */}
                    <div
                        className="relative bg-gray-100 p-4   w-full wdefined:w-[480px] border-2 custom-shadow  max-h-[613px] rounded-3xl"
                        disabled={true}
                    >
                        {buyerState ? (
                            <div className="flex items-center">
                                <button
                                    className="bg-gray-300 rounded-xl mb-2  font-medium text-gray-700 cursor-not-allowed  font-base py-2 px-4 "
                                    disabled={true}
                                >
                                    Buyer
                                </button>
                                <button
                                    disabled={true}
                                    className="  rounded-xl mb-2   text-gray-700 cursor-not-allowed py-2 px-4 "
                                >
                                    Seller
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <button
                                    className="rounded-xl mb-2  text-gray-700  cursor-not-allowed font-base py-2 px-4 "
                                    disabled={true}
                                >
                                    Buyer
                                </button>
                                <button
                                    disabled={true}
                                    className="bg-gray-300  rounded-xl mb-2 cursor-not-allowed text-gray-700 font-medium py-2 px-4 "
                                >
                                    Seller
                                </button>
                            </div>
                        )}
                        <div className=" text-lg text-gray-700 ml-1 font-bold ">
                            Current escrow
                        </div>
                        <div className="flex  items-center">
                            <button
                                className={` mt-1 bg-gray-200 rounded-xl overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm py-3 p-2 my-2 inline-block font-medium  text-gray-500`}
                                disabled={true}
                            >
                                No current escrows
                            </button>
                        </div>
                        {currentEscrow == "No current escrows" && !buyerState && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out rounded-xl w-full py-3 text-white font-bold"
                                onClick={buyerStateButton}
                            >
                                Switch to buyer
                            </button>
                        )}
                        {buyerState && (
                            <>
                                <div className="w-full py-4 border-2 px-4 rounded-xl mb-5 bg-white cursor-not-allowed">
                                    <div className="text-gray-400">Enter seller address</div>
                                </div>

                                <div className="w-full py-4 border-2 px-4 rounded-xl mb-1 bg-white cursor-not-allowed">
                                    <div className="text-gray-400">
                                        Enter escrow amount (How many tokens)
                                    </div>
                                </div>

                                <div className="flex justify-end text-xs text-gray-700 font-light mr-1 opacity-80">
                                    <div className="opacity-0">Balance:</div>
                                    {tokenBalance && (
                                        <div className="flex">
                                            <div className="mr-1">Balance:</div>
                                            {BigNumber(tokenBalance)
                                                .dividedBy(BigNumber("10").pow(18))
                                                .toString()}
                                        </div>
                                    )}
                                </div>

                                <div className="w-full py-4 border-2 px-4 rounded-xl  bg-white cursor-not-allowed">
                                    <div className="text-gray-400">Select Token Contract</div>
                                </div>

                                <div className="font-thin  text-xs text-gray-500 ml-1 mt-2 mb-2 opacity-0">
                                    **
                                </div>

                                <button
                                    className={`bg-blue-500  text-white  font-bold py-3 px-4 rounded-xl w-full flex items-center justify-center opacity-50
                                            `}
                                    disabled={true}
                                >
                                    Wallet not connected
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
