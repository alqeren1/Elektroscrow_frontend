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
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left">
                            Tokens to use for payment
                        </h1>

                        <div className="px-4 py-4 mt-20">
                            <div className="mt-2 ">
                                Elektroscrow's approach to payments is meticulously designed to
                                offer both <span className="font-bold"> flexibility </span> and{" "}
                                <span className="font-bold"> security</span>, catering to the
                                diverse needs of its users in the blockchain ecosystem. The
                                platform supports a wide array of tokens, ensuring users have the
                                freedom to engage in transactions with their{" "}
                                <span className="font-bold"> preferred digital assets</span>. For
                                ease of use and enhanced security, Elektroscrow provides a curated
                                list of <span className="font-bold"> trusted tokens</span>. This
                                list is carefully compiled, featuring tokens that have been vetted
                                for their reliability and stability, thus offering users peace of
                                mind when selecting a token for their escrow transactions.
                            </div>
                            <div className="mt-10 ">
                                In addition to the trusted tokens list, Elektroscrow uniquely
                                empowers its users with the capability to use{" "}
                                <span className="font-bold"> custom tokens </span> that may not be
                                included on the list. This feature is particularly beneficial for
                                users looking to transact with{" "}
                                <span className="font-bold"> niche </span> or{" "}
                                <span className="font-bold"> specialized tokens</span>, thereby
                                broadening the scope of potential escrow transactions on the
                                platform. However, with this power comes a significant
                                responsibility. Users opting for{" "}
                                <span className="font-bold"> custom tokens </span> are advised to
                                exercise <span className="font-bold"> due diligence</span>. The
                                decentralized nature of blockchain means that while users have
                                unparalleled freedom, they also bear the onus of ensuring the
                                legitimacy and safety of the custom tokens they choose to transact
                                with.
                            </div>
                            <div className="mt-10 ">
                                The platform's native token, a pivotal addition in the second phase
                                of Elektroscrow’s development, will introduce an even more seamless
                                transaction experience. Transactions made using this native token
                                will not incur protocol fees, providing a cost-effective option for
                                users. This innovative step is aligned with Elektroscrow’s mission
                                to continuously enhance user experience while maintaining a high
                                standard of transactional security and trust.
                            </div>
                            <div className="mt-10 ">
                                In summary, Elektroscrow stands out in the decentralized finance
                                landscape by offering a{" "}
                                <span className="font-bold"> diverse range of token </span> options
                                for escrow transactions. From a carefully selected list of{" "}
                                <span className="font-bold"> trusted tokens </span> to the freedom
                                of using <span className="font-bold"> custom tokens</span>, coupled
                                with the added advantage of its fee-exempt native token,
                                Elektroscrow is truly redefining user autonomy and security in
                                digital transactions.
                            </div>
                            <div className="justify-between flex ">
                                <a
                                    href="/docs/newEscrow"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center px-1 w-full text-right font-medium">
                                        Starting a new escrow
                                    </div>
                                </a>
                                <a
                                    href="/docs/depositing"
                                    className="bg-gray-100 bg-opacity-50 ml-2 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex px-1 justify-center text-left w-full font-medium">
                                        Funding the contract
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
