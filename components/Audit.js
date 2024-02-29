import React, { useState, useRef, useEffect } from "react"
import Arrow from "../svgs/arrow-up"
function How() {
    const [showTopBtn, setShowTopBtn] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true)
            } else {
                setShowTopBtn(false)
            }
        })
    }, [])

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <div className=" w-full px-6 wdefinedlg:px-2 wdefinedlg:w-[850px] text-justify">
            <div className=" py-4 ">
                <h1 className="font-bold text-4xl text-left">Audit and KYC</h1>

                <div className=" mb-20">
                    <div className=" text-xl mt-20">
                        Elektroscrow's smart contracts have been audited and the developers have
                        been KYC verified by{" "}
                        <a
                            href="https://x.com/solidproof_io"
                            target="_blank"
                            className="underline font-medium"
                        >
                            SolidProof
                        </a>
                    </div>
                    <img
                        src="/1500x500.jpg"
                        alt="Escrow Process Illustration"
                        className=" flex mt-10  rounded-3xl"
                    />
                    <img
                        src="/KYC.png"
                        alt="Escrow Process Illustration"
                        className=" flex mt-4 mb-4 rounded-3xl"
                    />
                    <div className=" text-xl mt-5">
                        You can access the{" "}
                        <a
                            href="https://github.com/solidproof/projects/tree/main/2024/Elektroscrow"
                            target="_blank"
                            className="underline font-medium"
                        >
                            Audit
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://github.com/solidproof/projects/tree/main/2024/Elektroscrow"
                            target="_blank"
                            className="underline font-medium"
                        >
                            KYC
                        </a>{" "}
                        reports by clicking the links
                    </div>

                    <h1 className="font-medium text-2xl mt-20">Why is this important?</h1>
                    <div className=" text-xl mt-10">
                        <span className="font-bold text-gray-900">An audit </span> in the context
                        of blockchain projects refers to a comprehensive review conducted by
                        independent third parties to evaluate the{" "}
                        <span className="font-bold text-gray-900"> security</span>,{" "}
                        <span className="font-bold text-gray-900"> functionality</span>, and
                        overall <span className="font-bold text-gray-900"> integrity</span> of the
                        project's code, particularly its smart contracts. This process helps
                        identify vulnerabilities, errors, or inefficiencies that could compromise
                        the project's security or performance. Know Your Customer{" "}
                        <span className="font-bold text-gray-900"> (KYC) </span>
                        verification, on the other hand, is a process used to{" "}
                        <span className="font-bold text-gray-900">
                            {" "}
                            verify the identity of the developers{" "}
                        </span>{" "}
                        behind a project, ensuring they are trustworthy and{" "}
                        <span className="font-bold text-gray-900">
                            {" "}
                            accountable for their actions
                        </span>
                        .
                    </div>
                    <div className=" text-xl mt-10">
                        Getting a project audited and its developers KYC verified is crucial in the
                        blockchain space for several reasons. Firstly, it significantly enhances
                        the project's credibility within the community by demonstrating a
                        commitment to <span className="font-bold text-gray-900"> security </span>{" "}
                        and <span className="font-bold text-gray-900"> transparency</span>.
                        Secondly,{" "}
                        <span className="font-bold text-gray-900">
                            {" "}
                            it reduces the risk of fraud and scams
                        </span>
                        , which are prevalent in the decentralized nature of blockchain ecosystems.
                        Lastly, it instills confidence among users and investors, knowing that the
                        project adheres to high standards of security and regulatory compliance,
                        making it a safer and more reliable choice for engagement and investment.
                    </div>
                </div>
            </div>
            {showTopBtn && (
                <button
                    onClick={goToTop}
                    className="fixed bottom-10 right-10 bg-gray-100  border-2 p-1 hover:bg-gray-200 rounded-lg  z-50"
                    title="Back to Top"
                >
                    <Arrow />
                </button>
            )}
        </div>
    )
}
export default How
