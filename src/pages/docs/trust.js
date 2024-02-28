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
                            Why Would You Trust Elektroscrow?
                        </h1>

                        <div className="px-4 py-4 mt-4">
                            <div className="mt-2 ">
                                <span className="font-bold"> </span>
                                Trust in Elektroscrow is built on{" "}
                                <span className="font-bold"> transparency </span> and{" "}
                                <span className="font-bold"> verifiability</span>, core principles
                                that guide our operations across all blockchain networks we operate
                                on. At the heart of our trustworthiness is the fact that the
                                solidity code of our smart contracts is{" "}
                                <span className="font-bold"> verified </span> and
                                <span className="font-bold"> open source </span> on every chain.
                                This means that anyone with the requisite technical skills can
                                review the code to understand precisely how Elektroscrow functions,
                                ensuring there are no hidden mechanisms or functionalities.
                            </div>
                            <div className="mt-10 ">
                                Further reinforcing confidence in our platform, we deploy our
                                contracts on <span className="font-bold"> test networks </span> for{" "}
                                <span className="font-bold"> each blockchain </span> we support,
                                with the deployed code being{" "}
                                <span className="font-bold"> identical </span> to that on the
                                mainnet. Users can
                                <span className="font-bold"> verify </span> this{" "}
                                <span className="font-bold"> themselves </span> by comparing the{" "}
                                <span className="font-bold"> contract creation bytecode </span>
                                between contracts on the{" "}
                                <span className="font-bold"> testnet </span> and the{" "}
                                <span className="font-bold"> realnet</span>. Tools like{" "}
                                <a
                                    href="https://countwordsfree.com/comparetexts"
                                    className="hover:underline hover:text-blue-500 italic font-light bg-gray-100 px-2 border rounded-md"
                                    target="blank"
                                >
                                    https://countwordsfree.com/comparetexts
                                </a>{" "}
                                can be used to confirm that the{" "}
                                <span className="font-bold"> bytecode</span>, and thus the
                                <span className="font-bold"> underlying code</span>, is{" "}
                                <span className="font-bold"> exactly </span>
                                <span className="font-bold">the same </span> across both networks.
                                <div className="mt-2 text-lsm italic opacity-80">
                                    *You can access all the contract addresses of Elektroscrow from
                                    the{" "}
                                    <a
                                        href="/docs/supportedNetworks"
                                        className="hover:underline font-medium  "
                                        target="blank"
                                    >
                                        Supported Networks
                                    </a>{" "}
                                    page.
                                </div>
                            </div>

                            <div className=" mt-10   bg-yellow-100 bg-opacity-30 rounded-3xl p-4">
                                <div className="mb-6 underline italic">
                                    <span className="font-medium ">Example: </span> Lets verify
                                    that Ethereum mainnet and testnet codes match
                                </div>
                                <div className=" mt-10 font-normal text-lsm ">
                                    We first visit the{" "}
                                    <span className="font-medium"> mainnet contract address</span>,
                                    then copy the
                                    <span className="font-medium"> bytecode </span> under{" "}
                                    <span className="font-medium"> Deployed Bytecode </span> title:
                                </div>
                                <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                    <a
                                        href="https://etherscan.com/address/0x47c9afc609a7cc4976ccc56c2f33b5e7352535c4#code"
                                        target="_blank"
                                        style={{
                                            fontFamily: "'Franklin Gothic', sans-serif",
                                        }}
                                        className="bg-gray-100  hover:underline  border rounded-md bg-opacity-50 p-1 "
                                    >
                                        0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4
                                    </a>{" "}
                                </div>
                                <div className=" mt-8 font-normal text-lsm ">
                                    Then, we paste this code to first input field in a text
                                    comparing tool:
                                    <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                        <a
                                            href="https://countwordsfree.com/comparetexts"
                                            target="_blank"
                                            style={{
                                                fontFamily: "'Franklin Gothic', sans-serif",
                                            }}
                                            className="bg-gray-100 hover:underline italic border rounded-md bg-opacity-50 p-1 "
                                        >
                                            https://countwordsfree.com/comparetexts
                                        </a>{" "}
                                    </div>
                                </div>
                                <div className=" mt-10 font-normal text-lsm ">
                                    After that, we visit the{" "}
                                    <span className="font-medium"> testnet contract address</span>,
                                    then copy the
                                    <span className="font-medium"> bytecode </span> under{" "}
                                    <span className="font-medium"> Deployed Bytecode </span> title:
                                </div>
                                <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                    <a
                                        href="https://sepolia.etherscan.io/address/0xad4a39Ea15a8bbb828336A447D38515989D361A4#code"
                                        target="_blank"
                                        style={{
                                            fontFamily: "'Franklin Gothic', sans-serif",
                                        }}
                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                    >
                                        0xad4a39Ea15a8bbb828336A447D38515989D361A4
                                    </a>{" "}
                                </div>
                                <div className=" mt-8 font-normal text-lsm ">
                                    Lastly, we paste this code to second input field in a text
                                    comparing tool and see that the difference is{" "}
                                    <span className="font-medium"> 0%</span>, which means the codes
                                    are <span className="font-medium"> exactly the same</span>, and
                                    we can experience the Elektroscrow contract in the testnet
                                    before using on the mainnet.
                                </div>
                            </div>

                            <div className="mt-10 ">
                                This level of openness allows users to{" "}
                                <span className="font-bold"> experiment </span> with Elektroscrow
                                in a testnet environment, engaging with the smart contract{" "}
                                <span className="font-bold"> without risking real funds</span>.
                                Through this <span className="font-bold"> hands-on </span>{" "}
                                experience, users can{" "}
                                <span className="font-bold"> see firsthand </span> that
                                Elektroscrow{" "}
                                <span className="font-bold"> delivers on its promises</span>,
                                further cementing the platform's{" "}
                                <span className="font-bold"> legitimacy</span>. By{" "}
                                <span className="font-bold"> providing mechanisms </span> for users
                                to independently <span className="font-bold"> verify </span> and{" "}
                                <span className="font-bold"> test </span> our contracts,
                                Elektroscrow ensures that{" "}
                                <span className="font-bold">
                                    {" "}
                                    trust is not just given but earned
                                </span>
                                , demonstrating our commitment to reliability and transparency in
                                every transaction.
                            </div>

                            <div className="justify-between flex">
                                <a
                                    href="/docs/how"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg mr-2 group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center text-right wdefinedmed:mr-0 mr-1 w-full text-right font-medium">
                                        How does it work?
                                    </div>
                                </a>
                                <a
                                    href="/docs/decentralization"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex justify-center text-left wdefinedmed:ml-0 ml-1 w-full font-medium">
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
