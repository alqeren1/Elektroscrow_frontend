import React, { useState, useEffect, useRef } from "react"
import { useWeb3Contract } from "react-moralis"
import { ArrowDown, ArrowUp } from "@web3uikit/icons"

const abi_logic = require("../constants1/abi_logic.json")
const EscrowDropdownModal = ({ isOpen, escrows, onSelectEscrow, onClose, currentEscrow }) => {
    const modalRef = useRef()

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredTokens, setFilteredEscrows] = useState(escrows)
    const [escrowStatuses, setEscrowStatuses] = useState({})

    const [reverseListing, setReverseListing] = useState(false)

    const { runContractFunction: gets_escrowComplete } = useWeb3Contract({
        abi: abi_logic,
        functionName: "s_escrowComplete",
    })

    useEffect(() => {
        if (escrows) {
            const checkAllEscrows = async () => {
                let newStatuses = {}

                for (let address of escrows) {
                    const escrowEnded = await gets_escrowComplete({
                        params: { contractAddress: address },
                    })

                    newStatuses[address] = escrowEnded ? "Ended" : "Live"
                }

                setEscrowStatuses(newStatuses)
            }

            checkAllEscrows()
            const searchLowerCase = searchTerm.toLowerCase()

            const filtered = escrows.filter((escrow) =>
                escrow.toLowerCase().includes(searchLowerCase),
            )
            setFilteredEscrows(filtered)
        }
    }, [searchTerm, escrows])

    useEffect(() => {
        const closeModalOnOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.addEventListener("mousedown", closeModalOnOutsideClick)
        return () => {
            document.removeEventListener("mousedown", closeModalOnOutsideClick)
        }
    }, [])

    if (!isOpen) {
        return null
    }
    const closeModalOnOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalOpen(false)
        }
    }
    const handleEscrowSelect = (address) => {
        onSelectEscrow(address)
        setSearchTerm("")
        onClose()
    }
    const reverseButton = () => {
        setReverseListing(!reverseListing)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end wdefined:items-center ">
            <div
                ref={modalRef}
                className={`relative bg-white py-4  shadow-lg w-full min-480px-width rounded-t-3xl wdefined:rounded-3xl ${
                    filteredTokens.length >= 6 ? "wdefined:h-[530px] h-1/2 " : ""
                }`}
            >
                <div className="sticky top-0 bg-white rounded-xl px-4 pt-2  z-10 ">
                    <div className="flex justify-between items-center mb-4 ">
                        <div className="font-bold text-gray-700 ml-1">Past Escrows</div>

                        <button
                            className="absolute  right-1 text-gray-700 mr-4 text-xl font-bold"
                            onClick={onClose}
                        >
                            &#10005; {/* X symbol */}
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder="Search for escrows"
                        className="p-2 border-2 border-gray-300 rounded w-full mb-3 focus:outline-none rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className=" w-full border-b-2 border-gray-300/50 "></div>
                <div
                    className="overflow-y-auto scrollbar-hide px-4 "
                    style={{ maxHeight: "calc(100% - 97px)" }}
                >
                    <div className=" flex text-gray-500 font-medium h-5 w-28 justify-center rounded-lg py-3 items-center  mt-1 hover:text-gray-700 hover:bg-gray-200">
                        {reverseListing ? (
                            <button className=" flex items-center" onClick={reverseButton}>
                                Old to new
                                <div className=" ml-1">
                                    <ArrowUp />
                                </div>
                            </button>
                        ) : (
                            <button className="  flex items-center" onClick={reverseButton}>
                                New to old
                                <div className=" ml-1">
                                    <ArrowDown />
                                </div>
                            </button>
                        )}
                    </div>
                    {reverseListing ? (
                        <div>
                            {filteredTokens
                                .slice()

                                .map((address, index) => (
                                    <div
                                        key={address}
                                        className={`flex items-center justify-between p-2 hover:bg-gray-200 h-16 cursor-pointer rounded-xl mt-2 mb-1 border-2 shadow-md bg-gray-50 text-gray-700 ${
                                            address === currentEscrow
                                                ? " border-primary border-[3px] "
                                                : ""
                                        }`}
                                        onClick={() => handleEscrowSelect(address)}
                                    >
                                        <div className="font-medium text-lsm overflow-hidden text-ellipsis whitespace-nowrap">
                                            {" "}
                                            {address}
                                        </div>
                                        <div className="">
                                            {escrowStatuses[address] == "Live" ? (
                                                <div className="flex items-center  rounded-lg bg-[#dfffbd] py-1 px-2 ">
                                                    <span class="relative flex h-2 w-2 mt-0.  mr-1 ">
                                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-greeen opacity-75"></span>
                                                        <span class="relative inline-flex rounded-full h-2 w-2 bg-greeen"></span>
                                                    </span>
                                                    <div
                                                        className={
                                                            "text-greeen text-sm font-medium "
                                                        }
                                                    >
                                                        {escrowStatuses[address]}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className={
                                                        "text-reed text-sm font-medium bg-red-100 py-1 px-1.5 rounded-lg"
                                                    }
                                                >
                                                    {escrowStatuses[address]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div>
                            {filteredTokens
                                .slice()
                                .reverse()
                                .map((address, index) => (
                                    <div
                                        key={address}
                                        className={`flex items-center justify-between p-2 hover:bg-gray-200 h-16 cursor-pointer rounded-xl mt-2 mb-1 border-2 shadow-md bg-gray-50 text-gray-700 ${
                                            address === currentEscrow
                                                ? "border-primary border-[3px] "
                                                : ""
                                        }`}
                                        onClick={() => handleEscrowSelect(address)}
                                    >
                                        <div className="font-medium text-lsm overflow-hidden text-ellipsis whitespace-nowrap">
                                            {" "}
                                            {address}
                                        </div>
                                        <div className="">
                                            {escrowStatuses[address] == "Live" ? (
                                                <div className="flex items-center  rounded-lg bg-[#dfffbd] py-1 px-2 ">
                                                    <span class="relative flex h-2 w-2 mt-0.  mr-1 ">
                                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-greeen opacity-75"></span>
                                                        <span class="relative inline-flex rounded-full h-2 w-2 bg-greeen"></span>
                                                    </span>
                                                    <div
                                                        className={
                                                            "text-greeen text-sm font-medium "
                                                        }
                                                    >
                                                        {escrowStatuses[address]}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className={
                                                        "text-reed text-sm font-medium bg-red-100 py-1 px-1.5 rounded-lg"
                                                    }
                                                >
                                                    {escrowStatuses[address]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EscrowDropdownModal
