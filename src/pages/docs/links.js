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
                            Useful Links
                        </h1>

                        <div className="px-4 py-4 mt-4">
                            <div className="mt-2 ">
                                You can access the useful links about Elektroscrow protocol down
                                below from the list
                                <div className="mt-10 mb-4 text-gray-800 font-bold text-2xl">
                                    Links
                                </div>
                                <div className="overflow-x-auto custom-scrollbar2 mt-4">
                                    <table className="min-w-full table-auto">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 p-4 text-lg font-medium"
                                                >
                                                    Website
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://elektroscrow.com"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline text-lg border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        https://elektroscrow.com{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4 whitespace-nowrap font-medium"
                                                >
                                                    Twitter
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://twitter.com/elektroscrow"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline text-lg border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        https://twitter.com/elektroscrow{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4 whitespace-nowrap font-medium"
                                                >
                                                    Telegram
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://t.me/elektroscrow"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline text-lg border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        https://t.me/elektroscrow{" "}
                                                    </a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4 font-medium"
                                                >
                                                    Github
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="https://github.com/elektroscrow"
                                                        target="_blank"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline text-lg border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        {" "}
                                                        https://github.com/elektroscrow{" "}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily:
                                                            "'Franklin Gothic', sans-serif",
                                                    }}
                                                    className="border-2 text-lg p-4 font-medium"
                                                >
                                                    Email
                                                </td>
                                                <td className="border-2 p-4 ">
                                                    <a
                                                        href="mailto:elektroscrow@proton.me"
                                                        style={{
                                                            fontFamily:
                                                                "'Franklin Gothic', sans-serif",
                                                        }}
                                                        className="bg-gray-100 hover:underline text-lg border rounded-md bg-opacity-50 p-1 "
                                                    >
                                                        elektroscrow@proton.me
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="justify-between flex">
                                <a
                                    href="/docs/supportedNetworks"
                                    className="bg-gray-100 bg-opacity-50 rounded-lg group mr-2 border-2 w-64 h-16 mt-20 text-[#7d7d7d] hover:text-gray-700 items-center flex cursor-pointer "
                                >
                                    <span className="rotate-[-90deg] ml-2 group-hover:translate-x-[-0.5rem] transition duration-300 ease-in-out">
                                        <Arrowup />{" "}
                                    </span>
                                    <div className="flex justify-center w-full  text-right font-medium">
                                        Supported Networks
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    )
}
