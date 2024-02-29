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
                            Protocol Fee
                        </h1>

                        <div className="px-4 py-4 mt-4 text-xl">
                            <div className="mt-2 ">
                                <span className="font-bold"> </span>
                                Elektroscrow's escrow service incorporates a modest{" "}
                                <span className="font-bold"> protocol usage fee</span>, essential
                                for the sustainability of the platform. The fee is set at{" "}
                                <span className="font-bold"> 1.5% </span> of the{" "}
                                <span className="font-bold"> escrow amount</span>, effectively
                                translating to <span className="font-bold"> 0.75% per user</span>.
                                This fee is applied only{" "}
                                <span className="font-bold"> after the conclusion </span> of the
                                escrow contract and is{" "}
                                <span className="font-bold"> deducted </span> from the{" "}
                                <span className="font-bold"> safety deposits </span> of each party.
                            </div>
                            <div className="mt-14 ">
                                Importantly, users have the flexibility to{" "}
                                <span className="font-bold"> withdraw </span> their funds
                                <span className="font-bold"> without incurring this fee </span> if
                                they choose to do so before the escrow contract's{" "}
                                <span className="font-bold"> initialization</span>. This feature is
                                particularly useful for users who may decide to opt out of the
                                transaction prior to its full activation, providing them a{" "}
                                <span className="font-bold"> fee-free </span> exit option.
                            </div>
                            <div className="mt-14 ">
                                The implementation of this fee is critical for Elektroscrow's
                                operational viability. It supports the platform's ongoing
                                development, maintenance, and the provision of secure, reliable
                                escrow services. By charging this fee, Elektroscrow ensures it can
                                continue to offer a high-quality, decentralized escrow solution
                                while maintaining the integrity and efficiency of its services.
                            </div>

                            <div className="justify-between flex text-base">
                                <a
                                    href="/docs/escrowStatus"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg mr-2 group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center wdefinedmed:mr-0 mr-1 w-full text-right font-medium">
                                        Escrow status
                                    </div>
                                </a>
                                <a
                                    href="/docs/supportedNetworks"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex justify-center wdefinedmed:ml-0 ml-1 w-full font-medium">
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
