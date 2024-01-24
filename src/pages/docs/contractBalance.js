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
                            Contract balance
                        </h1>

                        <div className="px-4 py-4 ">
                            <div className="mt-4 flex justify-center">
                                <div className="bg-yellow-100 w-full mb-6 mt-6 justify-center flex rounded-xl bg-opacity-30">
                                    <img
                                        src="/howWithdraw.png"
                                        alt="Escrow Completion Process"
                                        className="mt-2 mb-2 rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                The escrow contract's balance is shown under the Balance section.
                                Users are able to see if the counterparty has funded the contract
                                or not by monitoring this section. It provides a{" "}
                                <span className="font-bold"> real-time </span> view of the{" "}
                                <span className="font-bold"> funds deposited </span> in the
                                contract, ensuring that both parties can easily monitor the status
                                of their escrow. This feature allows users to see the exact amount
                                of assets held in escrow at any given time. The contract{" "}
                                <span className="font-bold"> initializes </span> when the balance
                                becomes{" "}
                                <span className="font-bold"> three times the escrow amount</span>.{" "}
                                <span className="italic opacity-70">
                                    (Including safety deposits)
                                </span>
                            </div>
                            <div className="justify-between flex ">
                                <a
                                    href="/docs/withdrawing"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center px-1 w-full text-right font-medium">
                                        Withdrawing
                                    </div>
                                </a>
                                <a
                                    href="/docs/initialization"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex px-1 justify-center text-left w-full font-medium">
                                        Initialization
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
