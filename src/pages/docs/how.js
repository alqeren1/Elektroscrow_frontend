import CommonLayout from "../../../components/CommonLayout"
import Menu from "../../../svgs/menu"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import Arrowup from "../../../svgs/arrow-up"
import How from "../../../components/How"
const inter = Inter({ subsets: ["latin"] })
export default function Home() {
    const [layoutOpen, setLayoutOpen] = useState(true)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 870) {
                setLayoutOpen(false)
            } else {
                setLayoutOpen(true)
            }
        }

        // Call the function on component mount
        handleResize()

        // Add event listener
        window.addEventListener("resize", handleResize)

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    async function layoutButton() {
        setLayoutOpen(!layoutOpen)
    }
    const [showTopBtn, setShowTopBtn] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true)
            } else {
                setShowTopBtn(false)
            }
        })
    }, [])

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <CommonLayout layoutOpen={layoutOpen} setLayoutOpen={setLayoutOpen}>
            <div className=" w-full  justify-center  ">
                <button
                    onClick={() => {
                        layoutButton()
                    }}
                    className={`fixed mt-5 ml-2 md:text-gray-400 hover:text-gray-700  text-gray-700  md:p-0  md:bg-inherit rounded p-1  bg-gray-100 ${
                        layoutOpen ? "hidden " : ""
                    }`}
                >
                    <Menu />
                </button>
                <div className="flex justify-center">
                    <div
                        className={`text-xl text-gray-800 text-justify w-full   h-screen font-base ${
                            layoutOpen ? " wdefinedxl:w-[850px]" : "wdefinedlg:w-[850px]"
                        }`}
                    >
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left text-gray-900">
                            How does it work?
                        </h1>
                        <div className=" p-4">
                            <h1 className="font-bold text-2xl mt-10 ">Decentralization logic</h1>

                            <img
                                src="/how_illustrate.png"
                                alt="Escrow Process Illustration"
                                className=" flex mt-4 mb-4 rounded-3xl"
                            />
                            <div className="mt-10">
                                <div className="font-bold mb-2">
                                    Initiating the Escrow Process:
                                </div>
                                <div>
                                    To initiate an escrow, the buyer is required to establish a new
                                    escrow contract by submitting accurate data. Subsequently, both
                                    parties must transfer the required amounts into the newly
                                    created contract. A pivotal feature of this system is the{" "}
                                    <span className="font-bold text-gray-900">safety deposit</span>
                                    , which is mandatory for both parties prior to activating the
                                    escrow. This mechanism is integral to enforcing the protocol’s
                                    reconciliation rule. The safety deposit amount is equivalent to
                                    the transaction value within the escrow. Consequently, the
                                    receiver is obligated to deposit a sum double the value of the
                                    escrow, while the provider deposits an amount equal to the
                                    escrow value. This process ensures enhanced security and
                                    commitment from both parties, aligning with the core principles
                                    of decentralized finance and fostering trust in the
                                    transaction.
                                    <div className="mt-10 mb-10 text-base italic bg-yellow-100 bg-opacity-30 rounded-3xl p-4">
                                        <div className="mb-6 underline decoration-dotted underline-offset-4">
                                            <span className="font-medium ">Example: </span> Lets
                                            say the escrow amount is{" "}
                                            <span className="font-bold">x</span> amount of tokens
                                            and <span className="font-bold">fee</span> is the
                                            protocol fee:{" "}
                                        </div>
                                        <div className="flex mt-2">
                                            <div className="font-medium">
                                                <div className="">
                                                    Required amounts to deposit:
                                                </div>
                                                <div className="mt-11 mb-1">
                                                    Transfered amounts after successfull escrow:
                                                </div>
                                                <div className=" mt-8">
                                                    Refunded amounts after mutual refund decision:
                                                </div>
                                            </div>
                                            <div className="ml-16 ">
                                                <div className="font-medium ">
                                                    Buyer: <span className="font-normal">2x</span>
                                                </div>
                                                <div className="font-normal text-xxs">
                                                    (Safety deposit + escrow amount)
                                                </div>

                                                <div className="flex wdefined:mt-7 mt-8 ">
                                                    <div className="font-medium ">
                                                        Buyer:{" "}
                                                        <span className="font-normal">
                                                            (x - fee/2)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex  ">
                                                    <div className="font-medium wdefined:mt-8 mt-16">
                                                        Buyer:{" "}
                                                        <span className="font-normal">
                                                            (2x - fee/2)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-10 font-medium">
                                                <div className="  ">
                                                    Seller: <span className="font-normal">x</span>
                                                    <div className="font-normal text-xxs">
                                                        (Safety deposit)
                                                    </div>
                                                </div>
                                                <div className=" wdefined:mt-7 mt-16 mb-1">
                                                    Seller:{" "}
                                                    <span className="font-normal">
                                                        (2x - fee/2)
                                                    </span>
                                                </div>
                                                <div className=" wdefined:mt-8 mt-16">
                                                    Seller:{" "}
                                                    <span className="font-normal">
                                                        (x - fee/2)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" mt-6 font-normal text-lsm ">
                                            *Safety deposit is{" "}
                                            <span className="font-medium">always</span> = escrow
                                            amount
                                        </div>
                                    </div>
                                    <div>
                                        Safety deposits are refunded upon the conclusion of the
                                        escrow. The protocol fee is equally divided and deducted
                                        from these safety deposits. The funds are{" "}
                                        <span className="font-bold text-gray-900">
                                            always withdrawable
                                        </span>{" "}
                                        and{" "}
                                        <span className="font-bold text-gray-900">
                                            not subject to the protocol fee
                                        </span>{" "}
                                        prior to the contract{" "}
                                        <span className="font-bold text-gray-900">
                                            initializing
                                        </span>
                                        . The contract is initialized when{" "}
                                        <span className="font-bold text-gray-900">
                                            both parties
                                        </span>{" "}
                                        have contributed the necessary amounts, including safety
                                        deposits. Once initialized, withdrawals are disabled.
                                        However, if one party has not funded the contract, the
                                        other party can always withdraw their funds without
                                        incurring a protocol fee. The only way to end an escrow
                                        contract after initialization and full funding by both
                                        parties is, through a mutual decision regarding the
                                        escrow's outcome.
                                        <div className="font-bold mt-20 mb-2">
                                            Post-Initialization:
                                        </div>
                                        <div>
                                            After funding and initialization of the contract, there
                                            are three potential outcomes. If both participants
                                            approve the escrow, the transaction is successfully
                                            completed and funds are transferred. If both request a
                                            refund, the contract concludes, and each party
                                            retrieves their initial deposits, minus the protocol
                                            fee. The last scenario involves the escrow tokens
                                            remaining in the contract until one of the
                                            aforementioned outcomes occurs. Should either or both
                                            parties opt to decline, the contract persists,
                                            safeguarding the assets until a consensus is reached.
                                            This structure compels parties to collaborate towards
                                            an optimal resolution, as their assets remain locked
                                            until an agreement is made. Elektroscrow achieves{" "}
                                            <span className="font-bold text-gray-900">
                                                full decentralization
                                            </span>{" "}
                                            by obliging participants to resolve disputes
                                            autonomously, governed by smart contracts, thereby{" "}
                                            <span className="font-bold text-gray-900">
                                                eliminating the need for a third-party moderator
                                            </span>
                                            .
                                        </div>
                                    </div>
                                    <div className="mt-10 mb-10 italic text-base bg-yellow-100 bg-opacity-30 rounded-3xl p-4">
                                        <div className="mb-6 underline decoration-dotted underline-offset-4">
                                            <span className="font-medium ">
                                                All possible scenarios after decisions are made:{" "}
                                            </span>
                                        </div>
                                        <div className="flex mt-2">
                                            <div className="font-medium">
                                                <div className="">Decisions:</div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-greeen">
                                                            Accept
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-writingdark">
                                                            Refund
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-greeen">
                                                            Accept
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-writingdark">
                                                            Refund
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-reed">Decline</span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-greeen">
                                                            Accept
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-writingdark">
                                                            Refund
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-reed">Decline</span>
                                                    </div>
                                                </div>
                                                <div className="flex font-medium mt-4">
                                                    <div className=" ">
                                                        Buyer:{" "}
                                                        <span className=" text-reed">Decline</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="font-medium">
                                                <div className="wdefinedsmlg:ml-4  mt-10 ">
                                                    Seller:{" "}
                                                    <span className=" text-greeen ">Accept</span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4 ">
                                                    Seller:{" "}
                                                    <span className=" text-writingdark">
                                                        Refund
                                                    </span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4">
                                                    Seller:{" "}
                                                    <span className=" text-writingdark">
                                                        Refund
                                                    </span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4">
                                                    Seller:{" "}
                                                    <span className=" text-greeen">Accept</span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4">
                                                    Seller:{" "}
                                                    <span className=" text-greeen">Accept</span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4">
                                                    Seller:{" "}
                                                    <span className=" text-reed">Decline</span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4">
                                                    Seller:{" "}
                                                    <span className=" text-reed">Decline</span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4">
                                                    Seller:{" "}
                                                    <span className=" text-writingdark">
                                                        Refund
                                                    </span>
                                                </div>
                                                <div className="wdefinedsmlg:ml-4  mt-4">
                                                    Seller:{" "}
                                                    <span className=" text-reed">Decline</span>
                                                </div>
                                            </div>
                                            <div className="wdefinedsmlg:ml-32 ml-4 wdefined:w-auto w-full">
                                                <div className="font-medium ">Outcomes:</div>

                                                <div className="flex wdefinedmt-6 mt-4 bg-green-100 bg-opacity-50 px-2 rounded-md ">
                                                    <div className="font-normal ">
                                                        Successfull transfer
                                                    </div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-11 w-auto bg-yellow-100 bg-opacity-90 px-2 rounded-md">
                                                    <div className="font-normal ">Refund</div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-10 ">
                                                    <div className="font-normal ">
                                                        Safekeeping*
                                                    </div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-10 ">
                                                    <div className="font-normal ">
                                                        Safekeeping*
                                                    </div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-10  ">
                                                    <div className="font-normal ">
                                                        Safekeeping*
                                                    </div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-10 ">
                                                    <div className="font-normal ">
                                                        Safekeeping*
                                                    </div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-10 ">
                                                    <div className="font-normal ">
                                                        Safekeeping*
                                                    </div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-9 ">
                                                    <div className="font-normal ">
                                                        Safekeeping*
                                                    </div>
                                                </div>
                                                <div className="flex wdefined:mt-4 mt-10">
                                                    <div className="font-normal ">
                                                        Safekeeping*
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-10  ">
                                            <span className="font-medium mr-2 ">Safekeeping*</span>
                                            = Funds are securely kept inside the contract until
                                            either <span className="font-medium  "> refund </span>{" "}
                                            or <span className="font-medium  "> transfer </span>
                                            outcomes occur
                                        </div>
                                    </div>
                                    <div className="justify-between text-base flex mt-20">
                                        <a
                                            href="/docs/home"
                                            className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16  text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                        >
                                            <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                                <Arrowup />{" "}
                                            </span>
                                            <div className="flex justify-center px-1 w-full text-right font-medium">
                                                Introduction
                                            </div>
                                        </a>
                                        <a
                                            href="/docs/trust"
                                            className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16  items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                        >
                                            <div className="flex px-1 justify-center text-left w-full font-medium">
                                                Why trust Elektroscrow?
                                            </div>
                                            <span className="rotate-[90deg] mr-2 group-hover:translate-x-2 transition duration-300 ease-in-out">
                                                <Arrowup />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showTopBtn && (
                    <button
                        onClick={goToTop}
                        className="fixed bottom-20 xl:bottom-10 right-10 bg-gray-100  border-2 p-1 hover:bg-gray-200 rounded-lg  z-50"
                        title="Back to Top"
                    >
                        <Arrowup />
                    </button>
                )}
            </div>
        </CommonLayout>
    )
}
