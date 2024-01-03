import { ConnectButton } from "web3uikit"
import WalletConnect from "./ConnectButtonWC"
import ManuelConnect from "./CustConnectButtonOnlyMetamask.jsx"
import NetworkSelector from "./NetworkSelector"
// header.js
import { useRouter } from "next/router"

export default function Header() {
    const router = useRouter()
    const currentPage = router.pathname
    console.log(currentPage)
    const navigateToEscrow = () => {
        router.push("/")
    }

    const navigateToHow = () => {
        router.push("/how")
    }
    return (
        <div className="p-2  flex flex-row   justify-between items-center">
            <div className="flex items-center">
                <img
                    src="/elektro_adjusted.png"
                    alt="Logo"
                    className="h-12 w-12 mr-2 rounded-xl mt-1"
                />

                <h1 className="font-bold text-3xl text-gray-800  ">Hivescrow</h1>
                <div className="flex mt-2 ml-6">
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
                        className={`ml-2 cursor-pointer font-medium py-2 px-2 rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                            currentPage == "/how"
                                ? "text-gray-700 opacity-100 "
                                : "text-gray-500 opacity-70"
                        }`}
                    >
                        How does it work
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
                </div>
            </div>

            <div className="flex items-center">
                <NetworkSelector />
                <div className="mr-5">
                    <ManuelConnect />
                </div>
            </div>
        </div>
    )
}
