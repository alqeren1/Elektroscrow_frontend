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
                            How is the protocol fully decentralized?
                        </h1>

                        <div className="px-4 py-4 mt-20">
                            <div className="mt-2 ">
                                Elektroscrow epitomizes decentralization in the digital finance
                                realm, embodying this principle at every operational level. The
                                fundamental architecture of Elektroscrow is built on blockchain
                                technology, which inherently distributes data across a network,
                                rather than centralizing it in a single location. This structure
                                ensures that{" "}
                                <span className="font-bold text-gray-900">
                                    {" "}
                                    no single entity, including Elektroscrow{" "}
                                </span>
                                itself , has overarching control or access to the entire system,
                                thereby preventing any form of centralized manipulation or
                                vulnerability. Furthermore, the platform leverages smart contracts,
                                which are self-executing contracts with the terms of the agreement
                                directly written into code. These smart contracts operate
                                independently on the blockchain, ensuring that transactions are
                                executed{" "}
                                <span className="font-bold text-gray-900">
                                    {" "}
                                    exactly as programmed{" "}
                                </span>{" "}
                                without any human intervention, bias, or error. This not only
                                enhances the reliability and security of transactions but also
                                aligns with the ethos of{" "}
                                <span className="font-bold text-gray-900">
                                    {" "}
                                    trustless interactions
                                </span>
                                , a cornerstone of decentralized systems. By{" "}
                                <span className="font-bold text-gray-900"> eliminating </span> the
                                need for{" "}
                                <span className="font-bold text-gray-900"> intermediaries</span>,
                                Elektroscrow reduces potential points of{" "}
                                <span className="font-bold text-gray-900"> failure </span> and{" "}
                                <span className="font-bold text-gray-900"> security risks</span>,
                                while also ensuring that transaction costs are kept to a minimum.
                                Additionally, at the second phase of the development, the
                                governance of Elektroscrow will be designed to be participatory and
                                distributed, often allowing the community of users to have a say in
                                key decisions, reflecting a commitment to a decentralized,
                                user-empowered approach. In essence, Elektroscrow's
                                decentralization is not just a feature but a{" "}
                                <span className="font-bold text-gray-900">
                                    {" "}
                                    foundational aspect{" "}
                                </span>
                                that permeates its technological infrastructure, governance model,
                                and operational ethos, making it a true representative of the
                                <span className="font-bold text-gray-900">
                                    {" "}
                                    decentralized future{" "}
                                </span>{" "}
                                of finance.
                            </div>
                            <div className="justify-between flex mt-20">
                                <a
                                    href="/docs/how"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16  text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center px-1 w-full text-right font-medium">
                                        How does it work?
                                    </div>
                                </a>
                                <a
                                    href="/docs/anonimity"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16  items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex px-1 justify-center text-left w-full font-medium">
                                        How is it anonymous?
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
