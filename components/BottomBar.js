import Twitter from "../svgs/twitter"
import Github from "../svgs/github"
// header.js
import { useRouter } from "next/router"

export default function BottomBar() {
    const router = useRouter()
    const currentPage = router.pathname

    const navigateToEscrow = () => {
        router.push("/")
    }

    const navigateToHow = () => {
        router.push("/how")
    }
    const navigateToAudit = () => {
        router.push("/audit")
    }
    return (
        <div className="flex items-center justify-center wdefined:px-5 px-2">
            <div className="md:hidden bg-white rounded-3xl w-full border py-1 ">
                <div className=" flex  items-center">
                    <div className="flex justify-evenly w-full">
                        <div
                            onClick={navigateToEscrow}
                            className={` cursor-pointer font-medium py-2 px-3 flex justify-center  rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                                currentPage == "/"
                                    ? "text-gray-700 opacity-100 "
                                    : "text-gray-500 opacity-70"
                            }`}
                        >
                            Escrow
                        </div>
                        <div
                            onClick={navigateToHow}
                            className={`cursor-pointer flex items-center justify-center  font-medium py-2 px-3  rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                                currentPage == "/how"
                                    ? "text-gray-700 opacity-100 "
                                    : "text-gray-500 opacity-70"
                            }`}
                        >
                            Guide
                        </div>

                        <div
                            className={` cursor-pointer font-medium py-2 px-3 flex justify-center  rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                                currentPage == "/docs"
                                    ? "text-gray-700 opacity-100"
                                    : "text-gray-500 opacity-70"
                            }`}
                        >
                            <a href="/docs/home" target="_blank" rel="noopener noreferrer">
                                Docs
                            </a>
                        </div>
                        <div
                            className={` cursor-pointer font-medium py-2 px-3 flex justify-center  rounded-xl transition duration-300 ease-in-out hover:bg-gray-200  ${
                                currentPage == "/audit"
                                    ? "text-gray-700 opacity-100"
                                    : "text-gray-500 opacity-70"
                            }`}
                        >
                            <a href="/audit">Audit</a>
                        </div>
                    </div>
                    <div className="flex justify-end px-2 ">
                        <a
                            href="https://twitter.com/elektroscrow"
                            target="_blank"
                            className="text-gray-500 opacity-70 hidden wdefinedxsm0:flex px-2  py-1 flex justify-center rounded-3xl transition duration-300 ease-in-out hover:bg-gray-200"
                        >
                            <Twitter />
                        </a>
                        <a
                            href="https://github.com/elektroscrow"
                            target="_blank"
                            className="text-gray-500 opacity-70 px-2 hidden wdefined:flex py-1 flex justify-center rounded-3xl transition duration-300 ease-in-out hover:bg-gray-200"
                        >
                            <Github />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
