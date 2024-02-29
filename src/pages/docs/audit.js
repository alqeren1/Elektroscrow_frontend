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
                        className={`text-xl text-gray-800 text-justify w-full   h-screen font-base ${
                            layoutOpen ? " wdefinedxl:w-[850px]" : "wdefinedlg:w-[850px]"
                        }`}
                    >
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left text-gray-900">
                            Audit and KYC
                        </h1>

                        <div className="px-4 py-4 mt-4">
                            <div className=" mb-20">
                                <div className=" text-xl ">
                                    Elektroscrow's smart contracts have been audited and the
                                    developers have been KYC verified by{" "}
                                    <a
                                        href="https://x.com/solidproof_io"
                                        target="_blank"
                                        className="underline font-medium"
                                    >
                                        SolidProof
                                    </a>
                                </div>
                                <img
                                    src="/1500x500.jpg"
                                    alt="Escrow Process Illustration"
                                    className=" flex mt-10  rounded-3xl"
                                />
                                <img
                                    src="/KYC.png"
                                    alt="Escrow Process Illustration"
                                    className=" flex mt-4 mb-4 rounded-3xl"
                                />
                                <div className=" text-xl mt-5">
                                    You can access the{" "}
                                    <a
                                        href="https://github.com/solidproof/projects/tree/main/2024/Elektroscrow"
                                        target="_blank"
                                        className="underline font-medium"
                                    >
                                        Audit
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="https://github.com/solidproof/projects/tree/main/2024/Elektroscrow"
                                        target="_blank"
                                        className="underline font-medium"
                                    >
                                        KYC
                                    </a>{" "}
                                    reports by clicking the links
                                </div>

                                <h1 className="font-medium text-2xl mt-20">
                                    Why is this important?
                                </h1>
                                <div className=" text-xl mt-10">
                                    <span className="font-bold text-gray-900">An audit </span> in
                                    the context of blockchain projects refers to a comprehensive
                                    review conducted by independent third parties to evaluate the{" "}
                                    <span className="font-bold text-gray-900"> security</span>,{" "}
                                    <span className="font-bold text-gray-900"> functionality</span>
                                    , and overall{" "}
                                    <span className="font-bold text-gray-900"> integrity</span> of
                                    the project's code, particularly its smart contracts. This
                                    process helps identify vulnerabilities, errors, or
                                    inefficiencies that could compromise the project's security or
                                    performance. Know Your Customer{" "}
                                    <span className="font-bold text-gray-900"> (KYC) </span>
                                    verification, on the other hand, is a process used to{" "}
                                    <span className="font-bold text-gray-900">
                                        {" "}
                                        verify the identity of the developers{" "}
                                    </span>{" "}
                                    behind a project, ensuring they are trustworthy and{" "}
                                    <span className="font-bold text-gray-900">
                                        {" "}
                                        accountable for their actions
                                    </span>
                                    .
                                </div>
                                <div className=" text-xl mt-10">
                                    Getting a project audited and its developers KYC verified is
                                    crucial in the blockchain space for several reasons. Firstly,
                                    it significantly enhances the project's credibility within the
                                    community by demonstrating a commitment to{" "}
                                    <span className="font-bold text-gray-900"> security </span> and{" "}
                                    <span className="font-bold text-gray-900"> transparency</span>.
                                    Secondly,{" "}
                                    <span className="font-bold text-gray-900">
                                        {" "}
                                        it reduces the risk of fraud and scams
                                    </span>
                                    , which are prevalent in the decentralized nature of blockchain
                                    ecosystems. Lastly, it instills confidence among users and
                                    investors, knowing that the project adheres to high standards
                                    of security and regulatory compliance, making it a safer and
                                    more reliable choice for engagement and investment.
                                </div>
                            </div>
                            <div className="justify-between text-base flex mt-20">
                                <a
                                    href="/docs/trust"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16  text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center px-1 w-full text-right font-medium">
                                        Why trust Elektroscrow?
                                    </div>
                                </a>
                                <a
                                    href="/docs/decentralization"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16  items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex px-1 justify-center text-left w-full font-medium">
                                        How is it decentralized?
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
