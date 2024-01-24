import CommonLayout from "../../../components/CommonLayout"
import Menu from "../../../svgs/menu"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import Arrowup from "../../../svgs/arrow-up"
import styles from "@/styles/Home.module.css"
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
                        className={`text-base text-gray-800 text-justify w-full   h-screen font-base ${
                            layoutOpen ? " wdefinedxl:w-[850px]" : "wdefinedlg:w-[850px]"
                        }`}
                    >
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left text-gray-900">
                            Safety deposit
                        </h1>

                        <div className="px-4 py-4 mt-20">
                            <div className="mt-2 ">
                                The safety deposit is a fundamental component of Elektroscrow's
                                transaction protocol, designed to enhance the security and
                                integrity of each escrow transaction. When a new escrow contract is
                                initiated, both parties – the buyer and the seller – are required
                                to deposit a predetermined amount, termed the{" "}
                                <span className="font-bold"> safety deposit</span>, in addition to
                                the actual transaction value. This deposit acts as a form of{" "}
                                <span className="font-bold"> collateral</span>,{" "}
                                <span className="font-bold"> ensuring </span> that{" "}
                                <span className="font-bold"> both parties </span>are{" "}
                                <span className="font-bold"> equally invested </span> and committed
                                to the successful completion of the transaction. The amount of the
                                safety deposit is <span className="font-bold"> equivalent </span>{" "}
                                to the
                                <span className="font-bold"> value </span> of the{" "}
                                <span className="font-bold"> escrow transaction</span>, meaning the
                                seller effectively deposits double the transaction amount, while
                                the buyer deposits the transaction value. This structure
                                incentivizes both parties to adhere to the{" "}
                                <span className="font-bold"> agreed-upon terms</span>, as any
                                deviation or <span className="font-bold"> failure </span> to comply
                                result in <span className="font-bold"> not </span> being able to{" "}
                                <span className="font-bold"> recieve the safety deposits </span>{" "}
                                back until a <span className="font-bold"> reconciliation </span>{" "}
                                between parties. Upon the successful conclusion of the transaction,
                                by <span className="font-bold"> mutual decisions </span> for the
                                outcome of the escrow, the safety deposits are{" "}
                                <span className="font-bold"> refunded </span> with a minor protocol
                                fee deduction. This concept is the key for{" "}
                                <span className="font-bold"> enforcing safety rules </span> to
                                participants <span className="font-bold"> without having </span> a
                                mediator to govern the process thus being fully{" "}
                                <span className="font-bold"> decentralized</span>.
                            </div>
                            <div className="mt-10  italic bg-yellow-100 bg-opacity-30 rounded-3xl p-4">
                                <div className="mb-6 underline decoration-dotted underline-offset-4">
                                    <span className="font-medium ">Example: </span> Lets say the
                                    escrow amount is <span className="font-bold">x</span> amount of
                                    tokens and <span className="font-bold">fee</span> is the
                                    protocol fee:{" "}
                                </div>
                                <div className="flex mt-2">
                                    <div className="font-medium">
                                        <div className="">Required amounts to deposit:</div>
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
                                                <span className="font-normal">(x - fee/2)</span>
                                            </div>
                                        </div>
                                        <div className="flex  ">
                                            <div className="font-medium wdefined:mt-8 mt-16">
                                                Buyer:{" "}
                                                <span className="font-normal">(2x - fee/2)</span>
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
                                            <span className="font-normal">(2x - fee/2)</span>
                                        </div>
                                        <div className=" wdefined:mt-8 mt-16">
                                            Seller:{" "}
                                            <span className="font-normal">(x - fee/2)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className=" mt-6 font-normal text-lsm ">
                                    *Safety deposit is <span className="font-medium">always</span>{" "}
                                    = escrow amount
                                </div>
                            </div>
                            <div className="justify-between flex">
                                <a
                                    href="/docs/depositing"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg mr-2 group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center w-full  text-right wdefinedmed:mr-0 mr-1 font-medium">
                                        Funding the contract
                                    </div>
                                </a>
                                <a
                                    href="/docs/withdrawing"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex justify-center wdefinedmed:ml-0 ml-1 w-full font-medium">
                                        Withdrawing
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
        </CommonLayout>
    )
}
