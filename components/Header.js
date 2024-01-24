import { useState, useEffect, useRef } from "react"
import WalletConnect from "./ConnectButtonWC"
import ManuelConnect from "./CustConnectButtonOnlyMetamask.jsx"
import NetworkSelector from "./NetworkSelector"
import Dots from "../svgs/dots"
import Twitter from "../svgs/twitter"
import Github from "../svgs/github"

// header.js
import { useRouter } from "next/router"

export default function Header() {
    const [dotsClicked, setDotsClicked] = useState(false)

    const modalRef = useRef(null)
    const router = useRouter()
    const currentPage = router.pathname

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setDotsClicked(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const navigateToEscrow = () => {
        router.push("/")
    }
    function dotsButton() {
        if (dotsClicked) {
        } else {
            setDotsClicked(true)
        }
    }
    const navigateToHow = () => {
        router.push("/how")
    }
    return (
        <div className="sticky top-0 p-2  flex flex-row bg-[#fffffd]  justify-between items-center">
            <div className="flex items-center">
                <div className="cursor-pointer flex items-center" onClick={navigateToEscrow}>
                    <img
                        src="/elektro_adjusted.png"
                        alt="Logo"
                        className="wdefinedxsm:h-14 wdefinedxsm:w-14 h-10 w-10  mt-1"
                    />

                    <h1
                        className="font-medium  text-gray-900 text-2xl wdefinedxsm:text-3xl"
                        style={{ fontFamily: "'Franklin Gothic', sans-serif" }}
                    >
                        Elektroscrow
                    </h1>
                </div>
                <div className="hidden md:flex mt-2 ml-6 items-center">
                    <div
                        onClick={navigateToEscrow}
                        className={`ml-2 cursor-pointer font-medium py-2 px-2 rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                            currentPage == "/"
                                ? "text-gray-700 opacity-100 "
                                : "text-gray-500 opacity-70"
                        }`}
                    >
                        Escrow
                    </div>
                    <div
                        onClick={navigateToHow}
                        className={`ml-2 cursor-pointer flex items-center font-medium py-2 px-2 rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                            currentPage == "/how"
                                ? "text-gray-700 opacity-100 "
                                : "text-gray-500 opacity-70"
                        }`}
                    >
                        <div className="hidden lg:block">How does it work</div>
                        <div className="lg:hidden">Guide</div>
                    </div>

                    <div
                        className={`ml-2 cursor-pointer font-medium py-2 px-2 rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                            currentPage == "/docs"
                                ? "text-gray-700 opacity-100"
                                : "text-gray-500 opacity-70"
                        }`}
                    >
                        <a href="/docs/home" target="_blank" rel="noopener noreferrer">
                            Docs
                        </a>
                    </div>
                    <div>
                        <button
                            className={`ml-2   font-medium py-2 px-2 rounded-xl transition duration-300 ease-in-out   ${
                                dotsClicked
                                    ? "text-gray-700 opacity-100"
                                    : "text-gray-500 opacity-70 cursor-pointer hover:bg-gray-200"
                            }`}
                            onClick={() => dotsButton()}
                            disabled={dotsClicked}
                        >
                            <Dots />
                        </button>
                        {dotsClicked && (
                            <div
                                className="absolute translate-x-[-175px] mt-2 z-10 w-56 shadow-lg rounded-xl bg-white border"
                                ref={modalRef}
                            >
                                <ul className="p-2  ">
                                    <a
                                        href="https://twitter.com/elektroscrow"
                                        target="_blank"
                                        className="flex items-center text-gray-700 hover:text-gray-900 py-1 text-lsm  font-normal cursor-pointer hover:bg-gray-100 rounded-lg"
                                    >
                                        <Twitter />
                                        <li className="  ">Twitter</li>
                                    </a>
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        className="flex text-gray-700 hover:text-gray-900 items-center  py-1 text-lsm  font-normal cursor-pointer hover:bg-gray-100 rounded-lg"
                                    >
                                        <Github />
                                        <li className="  ">GitHub</li>
                                    </a>
                                    <div className="flex items-center text-gray-900 py-1 ml-[7px]  text-sm font-normal  opacity-80 ">
                                        <span className=" mb-[1px]"> elektroscrow@proton.me</span>
                                    </div>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <NetworkSelector />
                <div className="md:mr-5 hidden wdefined:flex">
                    <ManuelConnect />
                </div>
            </div>
        </div>
    )
}
