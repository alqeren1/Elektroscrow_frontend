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
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left">Escrow status</h1>

                        <div className="px-4 py-4 ">
                            <div className="mt-4 flex justify-center">
                                <div>
                                    <img
                                        src="/howEnded.png"
                                        alt="Escrow Completion Process"
                                        className="mt-4 mb-10 rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                Once the parties reach a{" "}
                                <span className="font-bold text-gray-900"> mutual decision</span>{" "}
                                regarding the escrow outcome, the contract concludes and becomes
                                inoperative for future use. An escrow contract's status is
                                indicated as either{" "}
                                <span className="font-bold text-gray-900"> Live </span> or{" "}
                                <span className="font-bold text-gray-900"> Ended </span> under the
                                status section. Each escrow contract is designed for a{" "}
                                <span className="font-bold text-gray-900">single use</span>;
                                following its conclusion, a new contract must be established for
                                any subsequent escrow transactions. At the end of a contract, its
                                balance is depleted to zero, and the assets are either refunded to
                                the participants or the escrow amount is transferred to the
                                seller/provider. Additionally, safety deposits are returned to both
                                parties. This process ensures a clear, secure, and final resolution
                                to each escrow transaction.
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
                                    href="/docs/supportedNetworks"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex px-1 justify-center text-left w-full font-medium">
                                        Supported networks
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
