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

    async function layoutButton() {
        setLayoutOpen(!layoutOpen)
    }
    return (
        <CommonLayout layoutOpen={layoutOpen}>
            <div className=" w-full  justify-center  ">
                <button
                    onClick={() => {
                        layoutButton()
                    }}
                    className="mt-2 ml-2 text-gray-400 hover:text-gray-700"
                >
                    <Menu />
                </button>
                <div className="flex justify-center">
                    <div
                        className={`text-base text-gray-800 text-justify w-full   h-screen font-base ${
                            layoutOpen ? " wdefinedxl:w-[850px]" : "wdefinedlg:w-[850px]"
                        }`}
                    >
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left">
                            Withdrawing Funded Assets
                        </h1>
                        <div className="p-4 ">
                            <div className="mt-4 flex justify-center">
                                <div>
                                    <img
                                        src="/howWithdraw.png"
                                        alt="Asset Withdrawal Process"
                                        className="mt-4  rounded-xl mb-10"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 ">
                                You have the option to withdraw your funded assets prior to the{" "}
                                <span className="font-bold text-gray-900">initialization</span> of
                                the contract. Assets withdrawn at this stage are exempt from the
                                protocol fee. Upon clicking the{" "}
                                <span className="font-bold text-gray-900">Withdraw</span> button,
                                your initial deposit will be transferred back to your wallet in
                                full, with no deductions. This feature is to ensure trust and
                                flexibility for users.
                            </div>
                            <div className="justify-between flex ">
                                <a
                                    href="/docs/initialization"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center px-1 w-full text-right font-medium">
                                        Initialization
                                    </div>
                                </a>
                                <a
                                    href="/docs/escrowStatus"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex px-1 justify-center text-left w-full font-medium">
                                        Escrow status
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
