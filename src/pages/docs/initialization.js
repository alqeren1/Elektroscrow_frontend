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
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left">Initialization</h1>

                        <div className="px-4 py-4 mt-4">
                            <div className="mt-4 flex justify-center">
                                <div className="bg-yellow-100 w-full mb-6 mt-2 justify-center flex rounded-xl bg-opacity-30">
                                    <img
                                        src="/howInitialization.png"
                                        alt="Escrow Completion Process"
                                        className="mb-2 mt-2  rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="mt-2 ">
                                An escrow contract becomes active, or{" "}
                                <span className="font-bold"> initializes</span>, only after{" "}
                                <span className="font-bold"> both parties </span> have{" "}
                                <span className="font-bold"> deposited </span> the{" "}
                                <span className="font-bold"> required amounts </span> into the
                                contract. <span className="font-bold"> Prior </span> to this{" "}
                                <span className="font-bold"> initialization</span>, the funds
                                deposited by either party are{" "}
                                <span className="font-bold"> withdrawable</span>, offering
                                flexibility before the contract is fully established.
                            </div>
                            <div className="mt-10 ">
                                Once the contract is{" "}
                                <span className="font-bold"> initialized</span>, which occurs after
                                both parties fulfill the deposit requirements, the{" "}
                                <span className="font-bold"> withdrawal </span> option is
                                <span className="font-bold"> disabled</span>. This marks a
                                significant stage in the escrow process as it transitions the
                                transaction into{" "}
                                <span className="font-bold"> reconcilation state</span>, where the
                                funds are now firmly held within the escrow contract.
                            </div>
                            <div className="mt-10 ">
                                Upon initialization,{" "}
                                <span className="font-bold"> decision buttons </span> are displayed
                                to both parties. These buttons are for{" "}
                                <span className="font-bold"> determining the outcome </span>
                                of the escrow. The only way for either party to retrieve their
                                safety deposits, and to proceed with either the execution of the
                                asset <span className="font-bold"> transfer </span> or the{" "}
                                <span className="font-bold"> refund </span> of the escrow amount,
                                is through
                                <span className="font-bold"> mutual agreement </span> on the
                                escrow's outcome. Both parties must arrive at the same decision
                                regarding the transaction for it to proceed to its conclusion,
                                whether that be the completion of the transfer or a refund. This
                                mechanism <span className="font-bold"> enforces </span> the parties
                                to reconcilate for a{" "}
                                <span className="font-bold"> beneficial outcome </span>for both,
                                and <span className="font-bold"> ensures </span> the protocol's{" "}
                                <span className="font-bold"> decentralization</span>.
                            </div>
                            <div className="justify-between flex">
                                <a
                                    href="/docs/contractBalance"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center w-full  font-medium">
                                        Contract balance
                                    </div>
                                </a>
                                <a
                                    href="/docs/escrowStatus"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex justify-center w-full font-medium">
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
