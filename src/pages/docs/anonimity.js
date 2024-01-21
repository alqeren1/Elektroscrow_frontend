import CommonLayout from "../../../components/CommonLayout"
import Menu from "../../../svgs/menu"
import { useState, useEffect } from "react"
import Arrowup from "../../../svgs/arrow-up"

import { Inter } from "next/font/google"
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
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left">
                            How is the protocol anonymous?
                        </h1>

                        <div className="px-4 py-4 mt-20">
                            <div className="mt-2 ">
                                Elektroscrow stands as a paragon of anonymity in the realm of
                                decentralized finance, emphasizing the importance of{" "}
                                <span className="font-bold"> user privacy </span>
                                in every transaction. The platform is designed to ensure complete
                                anonymity by requiring{" "}
                                <span className="font-bold"> only the wallet address </span> of
                                users, without necessitating any personal information or
                                transaction details. This approach means that Elektroscrow
                                <span className="font-bold"> does not store</span>,{" "}
                                <span className="font-bold"> process</span>, or even ask for{" "}
                                <span className="font-bold"> any data </span> beyond the essential
                                blockchain addresses, thereby upholding the highest standards of
                                privacy. The transactions themselves are conducted purely on the
                                basis of smart contracts, which operate autonomously and
                                transparently on the blockchain, further ensuring that no
                                individual or entity can access user information. This system
                                guarantees that the <span className="font-bold"> specifics </span>{" "}
                                of an <span className="font-bold"> escrow agreement </span> remain{" "}
                                <span className="font-bold">
                                    {" "}
                                    known only to the involved parties
                                </span>
                                , aligning with the core ethos of blockchain technology which
                                champions anonymity and security. By prioritizing user anonymity,
                                Elektroscrow not only safeguards user privacy but also fosters a
                                trust-based environment where transactions are conducted without
                                fear of data compromise or privacy invasion.
                            </div>
                            <div className="justify-between flex mt-20">
                                <a
                                    href="/docs/decentralization"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16  text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center px-1 w-full text-right font-medium">
                                        How is it decentralized?
                                    </div>
                                </a>
                                <a
                                    href="/docs/newEscrow"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16  items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex px-1 justify-center text-left w-full font-medium">
                                        Starting a new escrow
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
