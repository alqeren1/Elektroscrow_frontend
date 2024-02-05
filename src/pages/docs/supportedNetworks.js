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
                            Supported networks
                        </h1>

                        <div className="px-4 py-4 mt-4">
                            <div className="mt-2 ">
                                Elektroscrow supports a range of blockchain networks to cater to a
                                diverse user base. This{" "}
                                <span className="font-bold"> multi-network compatibility </span>{" "}
                                ensures users can engage in escrow transactions on their preferred
                                blockchain platforms, enhancing the flexibility and accessibility
                                of Elektroscrow's services. By accommodating various networks,
                                Elektroscrow not only broadens its reach but also aligns with the
                                evolving landscape of decentralized finance, adapting to the
                                diverse needs of its users.
                                <div className="mt-10">
                                    The latest version of{" "}
                                    <span className="font-bold"> Elektroscrow v1.0 </span> contract
                                    is deployed at the addresses listed below.
                                </div>
                                <div className="mt-10 mb-4 text-gray-800 font-bold text-2xl">
                                    Mainnets
                                </div>
                                <div className="overflow-x-auto custom-scrollbar2 mt-4">
                                    <table className="min-w-full table-auto">
                                        <thead className="">
                                            <tr>
                                                <th className="border-2  p-4 w-1/4">Networks</th>
                                                <th className="border-2  p-4 w-3/4">
                                                    Contract Address
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg"
                                                >
                                                    Ethereum
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://etherscan.com/address/0x47c9afc609a7cc4976ccc56c2f33b5e7352535c4#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4 whitespace-nowrap"
                                                >
                                                    Binance smart chain
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://bscscan.com/address/0x47c9afc609a7cc4976ccc56c2f33b5e7352535c4#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4"
                                                >
                                                    Polygon
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://polygonscan.com/address/0x47c9afc609a7cc4976ccc56c2f33b5e7352535c4#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg"
                                                >
                                                    Avalanche
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://avascan.info/blockchain/all/address/0x66C046Bab48664F804b92DEa7C65B77BF7E67247/contract"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x66C046Bab48664F804b92DEa7C65B77BF7E67247{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-16 mb-4 text-gray-800 font-bold text-2xl">
                                    Testnets
                                </div>
                                <div className="overflow-x-auto custom-scrollbar2 mt-4">
                                    <table className="min-w-full table-auto">
                                        <thead className="">
                                            <tr>
                                                <th className="border-2  p-4 w-1/4">Networks</th>
                                                <th className="border-2  p-4 w-3/4">
                                                    Contract Address
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg"
                                                >
                                                    Eth - Sepolia
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://sepolia.etherscan.io/address/0xad4a39Ea15a8bbb828336A447D38515989D361A4#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0xad4a39Ea15a8bbb828336A447D38515989D361A4{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4 whitespace-nowrap"
                                                >
                                                    Bsc - Testnet
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://testnet.bscscan.com/address/0x66C046Bab48664F804b92DEa7C65B77BF7E67247#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x66C046Bab48664F804b92DEa7C65B77BF7E67247{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4"
                                                >
                                                    Polygon - Mumbai
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://mumbai.polygonscan.com/address/0x66C046Bab48664F804b92DEa7C65B77BF7E67247#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x66C046Bab48664F804b92DEa7C65B77BF7E67247{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg"
                                                >
                                                    Arbitrum - Sepolia
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://sepolia.arbiscan.io/address/0x66C046Bab48664F804b92DEa7C65B77BF7E67247#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x66C046Bab48664F804b92DEa7C65B77BF7E67247{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg"
                                                >
                                                    OP - Sepolia
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://optimism-sepolia.blockscout.com/address/0x66C046Bab48664F804b92DEa7C65B77BF7E67247?tab=contract"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x66C046Bab48664F804b92DEa7C65B77BF7E67247{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg"
                                                >
                                                    Base - Sepolia
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://sepolia.basescan.org/address/0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg"
                                                >
                                                    Celo - Alfajores
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://alfajores.celoscan.io/address/0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4#code"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline  border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        0x47c9aFc609A7cC4976CCc56C2F33B5e7352535C4{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="justify-between flex">
                                <a
                                    href="/docs/escrowStatus"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group mr-2 border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center w-full  font-medium">
                                        Escrow status
                                    </div>
                                </a>
                                <a
                                    href="/docs/supportedNetworks"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg border-2 w-64 group h-16 mt-20 items-center  text-[#7d7d7d] hover:text-gray-700 flex cursor-pointer"
                                >
                                    <div className="flex justify-center w-full wdefinedmed:mr-0 ml-1 font-medium text-left">
                                        How to connect
                                    </div>
                                    <span className="rotate-[90deg]  mr-2 group-hover:translate-x-2 transition duration-300 ease-in-out">
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
