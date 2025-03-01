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

export default function EscrowFactory({ onError }) {
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
    const [tokenDecimalsTemp, setTokenDecimalsTemp] = useState("")
    const [i_fee, seti_fee] = useState("")
    const [s_fee, sets_fee] = useState("")
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
    const [isCopied3, setIsCopied3] = useState(false)

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
    const [isStarting, setIsStarting] = useState(false)
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
    const { runContractFunction: gets_fee } = useWeb3Contract({
        abi: abi_factory,
        functionName: "s_fee",
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
        params: { spender: currentEscrow, value: "999999999999999999999999999999999999999999999" },
    })
    const { runContractFunction: approve2 } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "approve",
        params: { spender: currentEscrow, value: "999999999999999999999999999999999999999999999" },
    })
    const { runContractFunction: allowance } = useWeb3Contract({
        abi: abi_ERC20,
        contractAddress: getTokenContract,
        functionName: "allowance",
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
    const { runContractFunction: geti_fee } = useWeb3Contract({
        abi: abi_logic,
        functionName: "i_fee",
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
                    ? ethers.parseUnits(amountInput, tokenDecimalsTemp)
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
            if (currentEscrow != "Creating new escrow contract") {
                setShowInputFields(false)
            }
            if (currentEscrow == "No current escrows") {
                setShowInputFields(true)
            }

            checkApproval()
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

    useEffect(() => {
        if (onError) {
            const timeoutId = setTimeout(() => {
                onError("")
            }, 20000)

            // Clear the timeout if the component unmounts or the dependencies change
            return () => clearTimeout(timeoutId)
        }
    }, [onError])

    useEffect(() => {
        if (isWeb3Enabled && showInputFields) {
            // Set a timeout
            const timeoutId = setTimeout(() => {
                getTokenDecimalsTemp()
            }, 100)

            // Clear the timeout if the component unmounts or the dependencies change
            return () => clearTimeout(timeoutId)
        }
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            getTokenSymbol()
            geti_feeFunction()
            gets_feeFunction()
        }
    }, [getTokenContract, currentEscrow])

    async function getTokenDecimalsTemp() {
        const decimals = await checkToken1({ params: { contractAddress: tokenContract } })

        setTokenDecimalsTemp(decimals)
    }

    async function getTokenSymbol() {
        const symbol = await checkToken3({ params: { contractAddress: getTokenContract } })
        const decimals = await checkToken1({ params: { contractAddress: getTokenContract } })
        const name = await checkToken2({ params: { contractAddress: getTokenContract } })
        setTokenSymbol(symbol)
        setTokenDecimals(decimals)
        setTokenName(name)
    }
    async function gets_feeFunction() {
        const s_fee_ = await gets_fee({ params: { contractAddress: factoryAddress } })
        if (s_fee_) {
            sets_fee(s_fee_.toString() / 10)
        }
    }
    async function geti_feeFunction() {
        try {
            const i_fee_ = await geti_fee({ params: { contractAddress: currentEscrow } })
            seti_fee(i_fee_.toString() / 10)
        } catch {
            return
        }
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
        setIsStarting(false)
        setShowInputFields(false)
        handleNewNotification(tx)
        updateUI()
    }
    const handleSelectEscrow = (address) => {
        setCurrentEscrow(address)
        setModalOpen(false)
        setShowInputFields(false)
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
        if (window.fathom) {
            window.fathom.trackEvent("startEscrow-click")
        }
        setIsStarting(true)
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
                        onError("")
                    },
                    onError: (error) => {
                        console.error("Error occurred:", error), onError(error.message)
                        setIsStarting(false)
                    },
                })
            } catch (error) {
                console.error("Error occurred:", error)
                setIsStarting(false)
                onError(error.message)
            }
        }
    }
    const startEscrowButtonNew = async function () {
        setCurrentEscrow("Creating new escrow contract")
        setSeller("")
        setAmountInput("")
        setTokenBalance("")
        setTokenSymbol("")
        setGetTokenContract("")
        setShowInputFields(true)
    }

    const fundButton = async () => {
        // Call your contract function here using the inputs as parameters
        setIsFunding(true)

        try {
            await initialize({
                onSuccess: (tx) => {
                    handlesuccess(tx)
                    onError("")
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsFunding(false)
                    onError(error.message)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            onError(error.message)
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
                    onError("")
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsWithdrawing(false)
                    onError(error.message)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsWithdrawing(false)
            onError(error.message)
        }
    }
    const buyerStateButton = () => {
        if (window.fathom) {
            window.fathom.trackEvent("buyerSwitch-click")
        }
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
                        onError("")
                    },
                    onError: (error) => {
                        console.error("Error occurred:", error),
                            setIsApproving(false),
                            onError(error.message)
                    },
                })
            } catch (error) {
                console.error("Error occurred:", error)
                setIsApproving(false)
                onError(error.message)
            }
        }
        if (ethers.getAddress(account) == i_seller) {
            try {
                await approve2({
                    onSuccess: (tx) => {
                        handlesuccess(tx)
                        onError("")
                    },
                    onError: (error) => {
                        console.error("Error occurred:", error),
                            setIsApproving(false),
                            onError(error.message)
                    },
                })
            } catch (error) {
                console.error("Error occurred:", error)
                setIsApproving(false)
                onError(error.message)
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
                    onError("")
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsAccepting(false)
                    onError(error.message)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsAccepting(false)
            onError(error.message)
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
                    onError("")
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsDeclining(false)
                    onError(error.message)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsDeclining(true)
            onError(error.message)
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
                    onError("")
                },

                onError: (error) => {
                    console.error("Error occurred:", error)
                    setIsRefunding(false)
                    onError(error.message)
                },
            })
        } catch (error) {
            console.error("Error occurred:", error)
            setIsRefunding(false)
            onError(error.message)
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
        <div className=" p-1 w-full ">
            {isWeb3Enabled ? (
                <>
                    {factoryAddress ? (
                        <div className="   flex justify-center  w-full">
                            <div className="relative bg-gray-100 p-4   w-full wdefined:w-[480px] border-2 custom-shadow  rounded-3xl">
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
                                <div className="flex items-center ">
                                    <div className="flex items-center">
                                        <div className=" text-lg text-gray-700 ml-1 font-bold ">
                                            Current escrow
                                        </div>
                                        <div
                                            onClick={() => {
                                                copyToClipboard(currentEscrow)
                                                setIsCopied3(true)
                                                setTimeout(() => setIsCopied3(false), 1000)
                                            }}
                                            className={`ml-1  hover:cursor-pointer transition duration-300 ease-in-out ${
                                                currentEscrow == "No current escrows" ||
                                                currentEscrow == "Creating new escrow contract"
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                        >
                                            {" "}
                                            {isCopied3 ? (
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
                                    {currentEscrow != "Creating new escrow contract" &&
                                    currentEscrow != "No current escrows" ? (
                                        <div className="relative group ml-2 mt-0.5">
                                            <div className="cursor-pointer bg-white border px-2 rounded-lg mr-1 text-xs text-gray-700 font-normal  opacity-80">
                                                Fee: {i_fee}%
                                            </div>

                                            <div className="absolute bottom-full  left-0 min-w-[90px] hidden group-hover:block bg-white border shadow-lg px-2 py-1 rounded-xl  info-bar">
                                                {/* Info bar content */}
                                                <div className="text-gray-500 text-xs   justify-between flex">
                                                    <div className=" font-medium">Buyer </div>
                                                    {i_fee / 2}%
                                                </div>
                                                <div className="text-gray-500 text-xs   justify-between flex">
                                                    <div className=" font-medium">Seller </div>
                                                    {i_fee / 2}%
                                                </div>
                                                <div className="text-gray-500 text-xs font-bold mt-1 justify-center flex">
                                                    <div className="flex items-center text-gray-700">
                                                        {((i_amount.toString() /
                                                            10 ** tokenDecimals) *
                                                            i_fee) /
                                                            200}
                                                        <div className="ml-[3px]">
                                                            {tokenSymbol}
                                                        </div>
                                                    </div>
                                                    <div className=" ml-2 font-medium text-gray-500">
                                                        each{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : s_fee != null &&
                                      !(!buyerState && currentEscrow == "No current escrows") ? (
                                        <div className="relative group ml-2 mt-0.5">
                                            <div className="cursor-pointer bg-white border px-2 rounded-lg mr-1 text-xs text-gray-700 font-normal  opacity-80">
                                                Fee: {s_fee}%
                                            </div>

                                            <div className="absolute bottom-full  left-0 min-w-[90px] hidden group-hover:block bg-white border shadow-lg px-2 py-1 rounded-xl  info-bar">
                                                {/* Info bar content */}
                                                <div className="text-gray-500 text-xs   justify-between flex">
                                                    <div className=" font-medium">Buyer </div>
                                                    {s_fee / 2}%
                                                </div>
                                                <div className="text-gray-500 text-xs   justify-between flex">
                                                    <div className=" font-medium">Seller </div>
                                                    {s_fee / 2}%
                                                </div>
                                                <div className="text-gray-500 text-xs font-bold mt-1 justify-center flex">
                                                    <div className="flex items-center text-gray-700">
                                                        {(amountInput.toString() * s_fee) / 200}
                                                        <div className="ml-[3px]">
                                                            {tokenSymbol}
                                                        </div>
                                                    </div>
                                                    <div className=" ml-2 font-medium text-gray-500">
                                                        each{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <div className="flex  items-center justify-center">
                                    <div className="w-full px-0.5">
                                        <button
                                            className={` mt-1 bg-gray-200  rounded-xl overflow-hidden text-ellipsis whitespace-nowrap w-full text-sm py-3  p-2 my-2 inline-block ${
                                                currentEscrow == "No current escrows" ||
                                                currentEscrow == "Creating new escrow contract"
                                                    ? currentEscrow ==
                                                      "Creating new escrow contract"
                                                        ? "cursor-pointer font-medium  text-gray-500 hover:bg-gray-300 transition duration-300"
                                                        : "font-medium  text-gray-500"
                                                    : "cursor-pointer font-medium  text-gray-700 hover:bg-gray-300 transition duration-300 ease-in-out"
                                            }`}
                                            onClick={() => {
                                                setModalOpen(true)
                                            }}
                                            disabled={currentEscrow == "No current escrows"}
                                        >
                                            {" "}
                                            {currentEscrow == "No current escrows" ||
                                            currentEscrow == "Creating new escrow contract" ? (
                                                <div className=" ">{currentEscrow}</div>
                                            ) : (
                                                <div>
                                                    <div className="wdefined:flex hidden justify-center">
                                                        {currentEscrow}
                                                    </div>
                                                    <div className="wdefined:hidden wdefinedsm:flex hidden justify-center">
                                                        {currentEscrow.slice(0, 16)}....
                                                        {currentEscrow.slice(
                                                            currentEscrow.length - 16,
                                                        )}{" "}
                                                    </div>
                                                    <div className="wdefinedsm:hidden wdefinedxsm:flex hidden justify-center">
                                                        {currentEscrow.slice(0, 12)}....
                                                        {currentEscrow.slice(
                                                            currentEscrow.length - 12,
                                                        )}{" "}
                                                    </div>
                                                    <div className="wdefinedxsm:hidden flex justify-center">
                                                        {currentEscrow.slice(0, 9)}....
                                                        {currentEscrow.slice(
                                                            currentEscrow.length - 9,
                                                        )}{" "}
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                    <div className="">
                                        {anyEscrows != "No current escrows" &&
                                            currentEscrow != "Creating new escrow contract" &&
                                            buyerState && (
                                                <button
                                                    className="bg-primary hover:bg-hover text-writing transition duration-300 ease-in-out mr-0.5 text-sm wdefined:ml-1 font-bold py-3 mb-1 px-4  rounded-xl  "
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
                                        className="bg-primary hover:bg-hover transition duration-300 ease-in-out rounded-xl w-full py-3 text-writing font-bold"
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
                                    currentEscrow={currentEscrow}
                                />

                                {/* Escrow Information */}
                                {currentEscrow != "Creating new escrow contract" &&
                                    currentEscrow != "No current escrows" &&
                                    currentEscrow != "Initial" && (
                                        <div>
                                            <div className="flex items-center mb-2 ">
                                                <div className="flex w-full relative ">
                                                    <div className="wdefinedxxsm:flex w-full  rounded ml-auto  py-2 wdefinedsm:px-4 px-2 justify-between rounded-xl text-gray-700 bg-white border-2 items-center">
                                                        <div className="group cursor-pointer">
                                                            <div className="flex ">
                                                                <div className=" font-bold text-sm ">
                                                                    Initialized
                                                                </div>
                                                                <div className="opacity-30 ml-0.5 mt-0.5">
                                                                    {" "}
                                                                    <Questionmark />
                                                                </div>
                                                            </div>
                                                            <div className="absolute bottom-full left-0  hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                                {/* Info bar content */}
                                                                <p className="text-gray-500 text-xs ">
                                                                    Escrow is initialized after{" "}
                                                                    <span className="font-bold ">
                                                                        both parties
                                                                    </span>{" "}
                                                                    deposit the required funds to
                                                                    the contract. Funds are{" "}
                                                                    <span className="font-bold ">
                                                                        withdrawable
                                                                    </span>{" "}
                                                                    before the initialization.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="font-medium wdefinedxsm:ml-2 wdefinedxxsm:ml-1 text-sm  ">
                                                            {initializeStateString}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex w-full relative ">
                                                    <div className="wdefinedxxsm:flex w-full rounded ml-auto  justify-between py-2  wdefinedsm:px-4 px-2 ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                        <div className="group cursor-pointer">
                                                            <div className="flex ">
                                                                <div className=" font-bold text-sm ">
                                                                    Balance
                                                                </div>
                                                                <div className="opacity-30 ml-0.5 mt-0.5">
                                                                    <Questionmark />
                                                                </div>
                                                            </div>
                                                            <div className="absolute bottom-full left-0  hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                                {/* Info bar content */}
                                                                <p className="text-gray-500 text-xs">
                                                                    Current balance of the
                                                                    contract. The total balance of
                                                                    the contract should be{" "}
                                                                    <span className="font-bold ">
                                                                        three times
                                                                    </span>{" "}
                                                                    the escrow amount before
                                                                    initialization. (with safety
                                                                    deposits)
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center wdefinedsm:ml-4 wdefinedxxsm:ml-2">
                                                            <div className="font-medium  text-sm">
                                                                {BigNumber(balance)
                                                                    .dividedBy(
                                                                        BigNumber("10").pow(
                                                                            tokenDecimals,
                                                                        ),
                                                                    )
                                                                    .toString()}
                                                            </div>
                                                            <div className=" font-medium wdefinedsm:ml-3 ml-1 text-sm">
                                                                {tokenSymbol}
                                                            </div>
                                                        </div>
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
                                                    <div>
                                                        <div className="hidden wdefined:flex font-normal  text-base ">
                                                            {i_buyer}
                                                        </div>
                                                        <div className="wdefined:hidden wdefinedsm:flex hidden ">
                                                            {i_buyer.slice(0, 15)}......
                                                            {i_buyer.slice(i_buyer.length - 15)}
                                                        </div>
                                                        <div className="wdefinedxsm:flex wdefinedsm:hidden hidden ">
                                                            {i_buyer.slice(0, 12)}......
                                                            {i_buyer.slice(i_buyer.length - 12)}
                                                        </div>
                                                        <div className="wdefinedxsm:hidden wdefinedxxsm:flex hidden ">
                                                            {i_buyer.slice(0, 11)}......
                                                            {i_buyer.slice(i_buyer.length - 11)}
                                                        </div>
                                                        <div className="wdefinedxxsm:hidden flex  ">
                                                            {i_buyer.slice(0, 9)}......
                                                            {i_buyer.slice(i_buyer.length - 9)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className=" w-full rounded ml-auto  py-3 wdefinedxsm:px-4 px-2 mb-2  overflow-hidden  rounded-xl text-gray-700 bg-white border-2 items-center">
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
                                                    <div>
                                                        <div className="hidden wdefined:flex font-normal  text-base ">
                                                            {i_seller}
                                                        </div>
                                                        <div className="wdefined:hidden wdefinedsm:flex hidden ">
                                                            {i_seller.slice(0, 15)}......
                                                            {i_seller.slice(i_seller.length - 15)}
                                                        </div>
                                                        <div className="wdefinedxsm:flex wdefinedsm:hidden hidden ">
                                                            {i_seller.slice(0, 12)}......
                                                            {i_seller.slice(i_seller.length - 12)}
                                                        </div>
                                                        <div className="wdefinedxsm:hidden wdefinedxxsm:flex hidden ">
                                                            {i_seller.slice(0, 11)}......
                                                            {i_seller.slice(i_seller.length - 11)}
                                                        </div>
                                                        <div className="wdefinedxxsm:hidden flex  ">
                                                            {i_seller.slice(0, 9)}......
                                                            {i_seller.slice(i_seller.length - 9)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className=" w-full rounded ml-auto  py-3  wdefinedxsm:px-4 px-2 mb-1 overflow-hidden rounded-xl text-gray-700 bg-white border-2 items-center">
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

                                                <div className="hidden wdefined:flex font-normal  text-base ">
                                                    {getTokenContract}
                                                </div>
                                                <div className="wdefined:hidden wdefinedsm:flex hidden ">
                                                    {getTokenContract.slice(0, 15)}......
                                                    {getTokenContract.slice(
                                                        getTokenContract.length - 15,
                                                    )}
                                                </div>
                                                <div className="wdefinedxsm:flex wdefinedsm:hidden hidden ">
                                                    {getTokenContract.slice(0, 12)}......
                                                    {getTokenContract.slice(
                                                        getTokenContract.length - 12,
                                                    )}
                                                </div>
                                                <div className="wdefinedxsm:hidden wdefinedxxsm:flex hidden ">
                                                    {getTokenContract.slice(0, 11)}......
                                                    {getTokenContract.slice(
                                                        getTokenContract.length - 11,
                                                    )}
                                                </div>
                                                <div className="wdefinedxxsm:hidden flex  ">
                                                    {getTokenContract.slice(0, 9)}......
                                                    {getTokenContract.slice(
                                                        getTokenContract.length - 9,
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-1">
                                                <div className="wdefinedsm:flex w-full  rounded ml-0.5 p-0.5 overflow-hidden text-ellipsis whitespace-nowrap justify-center rounded-lg text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-xxs">
                                                        Name:
                                                    </div>
                                                    <div className="font-medium  wdefinedsm:ml-2 text-xxs  ">
                                                        {(tokenName && tokenName.length) > 12
                                                            ? tokenName.substring(0, 11)
                                                            : tokenName}
                                                    </div>
                                                </div>
                                                <div className="wdefinedsm:flex w-full rounded   justify-center ml-1 p-0.5 rounded-lg text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-xxs ">
                                                        Symbol:
                                                    </div>

                                                    <div className=" font-medium wdefinedsm:ml-2 text-xxs">
                                                        {tokenSymbol}
                                                    </div>
                                                </div>
                                                <div className="wdefinedsm:flex w-full rounded  mr-0.5 justify-center p-0.5 ml-1 rounded-lg text-gray-700 bg-gray-200 border-2 items-center">
                                                    <div className=" font-bold text-xxs ">
                                                        Decimals:
                                                    </div>

                                                    <div className=" font-medium wdefinedsm:ml-2 text-xxs">
                                                        {tokenDecimals}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${initializeState ? "" : "mt-8"}`}>
                                                {initializeState && (
                                                    <div className="flex mt-5 mb-1 items-center text-sm">
                                                        <div className="  mr-2 rounded-xl  ml-2 font-medium flex items-center">
                                                            Buyer:
                                                            <div
                                                                className={`ml-1 ${
                                                                    decisionBuyer == "Decline"
                                                                        ? "text-reed"
                                                                        : decisionBuyer == "Accept"
                                                                          ? "text-greeen"
                                                                          : "text-writingdark"
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
                                                                        ? "text-reed"
                                                                        : decisionSeller ==
                                                                            "Accept"
                                                                          ? "text-greeen"
                                                                          : "text-writingdark"
                                                                }`}
                                                            >
                                                                {decisionSeller}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center ">
                                                    <div className="relative  w-full ">
                                                        <div className=" w-full rounded ml-auto   py-1 wdefinedxxsm:px-2 px-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                            <div className="group cursor-pointer">
                                                                <div className="flex ">
                                                                    <div className=" font-bold text-sm ">
                                                                        Status
                                                                    </div>
                                                                    <div className="opacity-30 ml-0.5 mt-0.5">
                                                                        <Questionmark />
                                                                    </div>
                                                                </div>
                                                                <div className="absolute bottom-full left-0  w-64 hidden transition duration-300 ease-in-out group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar">
                                                                    {/* Info bar content */}
                                                                    <p className="text-gray-500 text-xs">
                                                                        Shows to status of the
                                                                        current escrow contract.
                                                                        Escrow is ended when{" "}
                                                                        <span className="font-bold ">
                                                                            both parties agree
                                                                        </span>{" "}
                                                                        on the same decision,
                                                                        either{" "}
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
                                                            <div className="flex items-center">
                                                                <div className="font-medium wdefinedmed:font-normal  text-base   wdefinedmed:text-xl">
                                                                    {escrowStatus == "Live" ? (
                                                                        <div className="text-greeen ">
                                                                            {escrowStatus}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-reed ">
                                                                            {escrowStatus}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="relative  w-full">
                                                        <div className=" w-full rounded ml-auto py-1 wdefinedxsm:px-2 px-1  ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
                                                            <div className="group cursor-pointer">
                                                                <div className="flex ">
                                                                    <div className=" font-bold text-sm ">
                                                                        Amount
                                                                    </div>
                                                                    <div className="opacity-30 ml-0.5 mt-0.5">
                                                                        <Questionmark />
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
                                                            <div className="flex items-center">
                                                                <div className="font-normal text-base   wdefinedmed:text-xl">
                                                                    {BigNumber(i_amount)
                                                                        .dividedBy(
                                                                            BigNumber("10").pow(
                                                                                tokenDecimals,
                                                                            ),
                                                                        )
                                                                        .toString()}
                                                                </div>
                                                                <div className="hidden wdefinedmed:flex font-normal ml-1 text-xl">
                                                                    {tokenSymbol}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {escrowStatus != "Ended" && (
                                                        <div className="relative group w-full">
                                                            <div className=" w-full rounded ml-auto cursor-pointer py-1 wdefinedxsm:px-2 px-1 mr-0.5 ml-1 rounded-xl text-gray-700 bg-white border-2 items-center">
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
                                                                        <div className="font-normal  text-base   wdefinedmed:text-xl">
                                                                            {BigNumber(i_amount)
                                                                                .dividedBy(
                                                                                    BigNumber(
                                                                                        "10",
                                                                                    ).pow(
                                                                                        tokenDecimals,
                                                                                    ),
                                                                                )
                                                                                .toString()}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="font-normal text-base   wdefinedmed:text-xl">
                                                                            {BigNumber(i_amount2)
                                                                                .dividedBy(
                                                                                    BigNumber(
                                                                                        "10",
                                                                                    ).pow(
                                                                                        tokenDecimals,
                                                                                    ),
                                                                                )
                                                                                .toString()}
                                                                        </div>
                                                                    )}

                                                                    <div className="hidden wdefinedmed:flex  font-normal ml-1 text-xl">
                                                                        {tokenSymbol}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute bottom-full  right-0 w-64  hidden group-hover:block bg-white border shadow-lg p-2 rounded-xl  info-bar2">
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
                                                                    <a
                                                                        className="font-bold text-writingdark hover:cursor-pointer hover:underline"
                                                                        href="/docs/safetyDeposit"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        safety deposit
                                                                    </a>
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
                                                {tokenBalance && tokenDecimalsTemp && (
                                                    <div className="flex">
                                                        <div className="mr-1">Balance:</div>
                                                        {BigNumber(tokenBalance)
                                                            .dividedBy(
                                                                BigNumber("10").pow(
                                                                    tokenDecimalsTemp,
                                                                ),
                                                            )
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
                                                className={`bg-primary    font-bold py-3 px-4 rounded-xl w-full flex items-center justify-center ${
                                                    isLoading ||
                                                    isFetching ||
                                                    isStarting ||
                                                    (ethers.isAddress(seller)
                                                        ? ethers.getAddress(account) ==
                                                          ethers.getAddress(seller)
                                                        : true) ||
                                                    !seller ||
                                                    !amountInput ||
                                                    !tokenContract ||
                                                    !isTokenValid
                                                        ? "opacity-50 text-gray-400 "
                                                        : "hover:bg-hover text-writing transition duration-300 ease-in-out"
                                                }`}
                                                onClick={startEscrowButton}
                                                disabled={
                                                    isLoading ||
                                                    isStarting ||
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
                                                {isLoading || isFetching || isStarting ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-writing"
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
                                                        <div className="text-writing">
                                                            Processing...
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div>Start Escrow</div>
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
                                    currentEscrow != "Creating new escrow contract" && (
                                        <button
                                            className={`bg-primary  w-full rounded-xl text-writing font-bold py-2 px-4  ml-right mr-4 mt-4  flex items-center justify-center ${
                                                isLoading || isFetching || isApproving
                                                    ? "opacity-50 "
                                                    : "hover:bg-hover transition duration-300 ease-in-out"
                                            }`}
                                            onClick={approveButton}
                                            disabled={isLoading || isFetching || isApproving}
                                        >
                                            {isApproving ? (
                                                <>
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-writing"
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
                                                <div className="text-writing">Approve</div>
                                            )}
                                        </button>
                                    )}
                                {isApproved &&
                                    anyEscrows != "No current escrows" &&
                                    !isFunded &&
                                    !isEscrowEnded &&
                                    currentEscrow != "Creating new escrow contract" && (
                                        <button
                                            className={`bg-primary  text-writing font-bold py-2 px-4 w-full rounded-xl ml-right mr-4 mt-4 flex items-center justify-center ${
                                                isLoading || isFetching || isFunding
                                                    ? "opacity-50 "
                                                    : "hover:bg-hover transition duration-300 ease-in-out"
                                            }`}
                                            onClick={fundButton}
                                            disabled={isLoading || isFetching || isFunding}
                                        >
                                            {isFunding ? (
                                                <>
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-writing"
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
                                    currentEscrow != "Creating new escrow contract" &&
                                    isFunded &&
                                    !isEscrowEnded &&
                                    !initializeState && (
                                        <button
                                            className={`bg-primary  text-writing  font-bold py-2 px-4 mt-4 w-full rounded-xl ml-right mr-4 flex items-center justify-center ${
                                                isLoading || isFetching || isWithdrawing
                                                    ? "opacity-50 "
                                                    : "hover:bg-hover transition duration-300 ease-in-out"
                                            }`}
                                            onClick={withdrawButton}
                                            disabled={isLoading || isFetching || isWithdrawing}
                                        >
                                            {isWithdrawing ? (
                                                <>
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-writing"
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
                                    !isEscrowEnded &&
                                    isFunded &&
                                    initializeState &&
                                    currentEscrow != "Creating new escrow contract" && (
                                        <div className=" ">
                                            <div className=" flex items-center mt-2">
                                                <button
                                                    className={`bg-greeen  mr-2 w-full text-writing font-bold py-2   rounded-xl   ${
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Accept" ||
                                                              isAccepting
                                                                ? "opacity-50 cursor-not-allowed"
                                                                : "hover:bg-greeenhover transition duration-300 ease-in-out"
                                                            : isLoading ||
                                                                isFetching ||
                                                                decisionSeller == "Accept" ||
                                                                isAccepting
                                                              ? "opacity-50 cursor-not-allowed"
                                                              : "hover:bg-greeenhover transition duration-300 ease-in-out"
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
                                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-writing"
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
                                                    className={`bg-reed w-full text-writing font-bold py-2   rounded-xl ${
                                                        i_buyer &&
                                                        ethers.isAddress(i_buyer) &&
                                                        ethers.getAddress(account) ===
                                                            ethers.getAddress(i_buyer)
                                                            ? isLoading ||
                                                              isFetching ||
                                                              decisionBuyer == "Decline" ||
                                                              isDeclining
                                                                ? "opacity-50 cursor-not-allowed "
                                                                : "hover:bg-reedhover transition duration-300 ease-in-out"
                                                            : isLoading ||
                                                                isFetching ||
                                                                decisionSeller == "Decline" ||
                                                                isDeclining
                                                              ? "opacity-50 cursor-not-allowed"
                                                              : "hover:bg-reedhover transition duration-300 ease-in-out"
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
                                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-writing"
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
                                                className={`bg-primary  w-full text-writing font-bold py-2 mt-2 rounded-xl ${
                                                    i_buyer &&
                                                    ethers.isAddress(i_buyer) &&
                                                    ethers.getAddress(account) ===
                                                        ethers.getAddress(i_buyer)
                                                        ? isLoading ||
                                                          isFetching ||
                                                          decisionBuyer == "Refund" ||
                                                          isRefunding
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : "hover:bg-hover transition duration-300 ease-in-out"
                                                        : isLoading ||
                                                            isFetching ||
                                                            decisionSeller == "Refund" ||
                                                            isRefunding
                                                          ? "opacity-50 cursor-not-allowed"
                                                          : "hover:bg-hover transition duration-300 ease-in-out"
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
                                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-writing"
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
                                                className="bg-primary hover:bg-hover text-writing  text-sm ml-1 font-bold py-3 mb-1 px-4 rounded-xl  "
                                                disabled={true}
                                            >
                                                New
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {currentEscrow == "No current escrows" && !buyerState && (
                                    <button
                                        className="bg-primary hover:bg-hover transition duration-300 ease-in-out rounded-xl w-full py-3 text-writing font-bold"
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
                                                        .dividedBy(
                                                            BigNumber("10").pow(tokenDecimals),
                                                        )
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
                                            className={`bg-primary  text-writing  font-bold py-3 px-4 rounded-xl w-full flex items-center justify-center opacity-50
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
                <div className="   flex justify-center  w-full">
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
                        {!buyerState && (
                            <div>
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
                                        className={`bg-primary  text-gray-400  font-bold py-3 px-4 rounded-xl w-full flex items-center justify-center opacity-50
                                            `}
                                        disabled={true}
                                    >
                                        Wallet not connected
                                    </button>
                                )}
                            </div>
                        )}
                        {buyerState && (
                            <>
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
                                            <div className="mr-1 opacity-0">Balance:</div>
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
                                    className={`bg-primary  text-gray-400  font-bold py-3 px-4 rounded-xl w-full flex items-center justify-center opacity-50
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
