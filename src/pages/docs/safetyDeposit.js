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
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left">Safety deposit</h1>

                        <div className="px-4 py-4 mt-20">
                            <div className="mt-2 ">
                                The safety deposit is a fundamental component of Elektroscrow's
                                transaction protocol, designed to enhance the security and
                                integrity of each escrow transaction. When a new escrow contract is
                                initiated, both parties – the buyer and the seller – are required
                                to deposit a predetermined amount, termed the safety deposit, in
                                addition to the actual transaction value. This deposit acts as a
                                form of collateral, ensuring that both parties are equally invested
                                and committed to the successful completion of the transaction. The
                                amount of the safety deposit is equivalent to the value of the
                                escrow transaction, meaning the seller effectively deposits double
                                the transaction amount, while the buyer deposits the transaction
                                value. This structure incentivizes both parties to adhere to the
                                agreed-upon terms, as any deviation or failure to comply result in
                                not being able to recieve the safety deposits back until a
                                reconciliation between parties. Upon the successful conclusion of
                                the transaction, by mutual decisions for the outcome of the escrow,
                                the safety deposits are refunded with a minor protocol fee
                                deduction. This concept is the key for enforcing safety rules to
                                participants without having a mediator to govern the process thus
                                being fully decentralized.
                            </div>
                            <div className="justify-between flex">
                                <a
                                    href="/docs/depositing"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center w-full  font-medium">
                                        Funding the contract
                                    </div>
                                </a>
                                <a
                                    href="/docs/contractBalance"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex justify-center w-full font-medium">
                                        Contract balance
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
