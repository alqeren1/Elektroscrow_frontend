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
                            Starting a New Escrow
                        </h1>
                        <div className="p-4">
                            <div className="flex mt-6 ">
                                <div className="mt-4 ">
                                    <div className="bg-yellow-100 w-full mb-6  justify-center flex rounded-xl bg-opacity-30">
                                        <img
                                            src="/how1.png"
                                            alt="Escrow Process Illustration"
                                            className=" flex mt-2 mb-2  rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        The creation of an escrow contract is exclusively initiated
                                        by the buyer. This means it can only be initialized if you
                                        are the party requesting a service or purchasing an asset.
                                        Providers or sellers must inform the buyer to commence this
                                        process.
                                    </div>
                                    <div className="mt-4">
                                        To establish an escrow contract between the receiver and
                                        the provider, the buyer must input the seller’s contract
                                        address into the designated field. Subsequently, the buyer
                                        specifies the amount of tokens to be transferred upon the
                                        contract's completion. The next step involves selecting a
                                        token contract for the escrow, either from Elektroscrow's
                                        listed tokens or by entering a custom token.{" "}
                                        <span className="opacity-80 italic">
                                            (Always conduct due diligence when using custom tokens)
                                        </span>{" "}
                                        Once all fields are populated with{" "}
                                        <span className="font-bold text-gray-900">
                                            correct data
                                        </span>
                                        , the buyer finalizes the process by clicking the{" "}
                                        <span className="font-bold text-gray-900">
                                            Start Escrow
                                        </span>{" "}
                                        button to create the contract.
                                    </div>
                                </div>
                            </div>
                            <div className="justify-between flex ">
                                <a
                                    href="/docs/anonimity"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center px-1 w-full text-right font-medium">
                                        How is it anonymous?
                                    </div>
                                </a>
                                <a
                                    href="/docs/paymentToken"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="wdefinedsm:flex hidden justify-center px-1 w-full text-left font-medium">
                                        Tokens to use for payment
                                    </div>
                                    <div className=" wdefinedsm:hidden flex justify-center px-1 w-full text-left font-medium">
                                        Tokens to use
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
