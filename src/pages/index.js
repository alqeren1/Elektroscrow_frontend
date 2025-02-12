// pages/index.js
import { motion } from "framer-motion"
import Head from "next/head"
import {
    LockClosedIcon,
    ShieldCheckIcon,
    ArrowsRightLeftIcon,
    CpuChipIcon,
    ScaleIcon,
    UserGroupIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
export default function Home() {
    const [contractAddress, setContractAddress] = useState("Loading...")
    useEffect(() => {
        fetch("/config.json?cacheBust=" + Date.now()) // This file lives in /public/config.json
            .then((response) => response.json())
            .then((data) => {
                // data should be { contractAddress: "..." }
                if (data.contractAddress) {
                    setContractAddress(data.contractAddress)
                } else {
                    setContractAddress("Not found!")
                }
            })
            .catch((err) => {
                console.error("Error fetching config:", err)
                setContractAddress("Error loading address")
            })
    }, [])
    return (
        <>
            <Head>
                <title>Elektroscrow</title>
                <meta
                    name="description"
                    content="Discover Elektroscrow's decentralized crypto escrow services, providing secure, private transactions across blockchain networks. Our platform leverages smart contracts for trustless exchanges without intermediaries, ensuring user autonomy and enhanced security."
                />

                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta name="twitter:site" content="@elektroscrow"></meta>
                <meta name="twitter:title" content="Crypto Escrow"></meta>
                <meta
                    name="twitter:description"
                    content="Discover Elektroscrow's decentralized crypto escrow services, providing secure, private transactions across blockchain networks utilizing smart contracts."
                ></meta>
                <meta
                    name="twitter:image"
                    content="https://elektroscrow.com/elektrodocs.png"
                ></meta>
            </Head>
            <div className="bg-white min-h-screen">
                {/* Navigation */}
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src="/elektro_adjusted.png"
                                className="md:h-16 h-12 w-12 md:w-16 mr-1 md:mr-1"
                                alt="Elektroscrow"
                            />
                            <h1
                                className="font-medium text-gray-900 text-2xl wdefinedxsm:text-3xl"
                                style={{ fontFamily: "'Franklin Gothic', sans-serif" }}
                            >
                                Elektroscrow
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a
                                href="/docs/home"
                                className="text-gray-700 font-medium hover:text-yellow-500"
                            >
                                Docs
                            </a>
                            <a
                                href="/audit"
                                className="text-gray-700 font-medium hover:text-yellow-500"
                            >
                                Audit
                            </a>
                            <a
                                href="/app"
                                className="bg-[#fee54f] hover:bg-[#f0d74b] px-4 py-2 rounded-lg text-gray-700 font-semibold"
                            >
                                Launch App
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="container mx-auto h-screen px-6 py-20">
                    <div className="flex flex-col md:flex-row items-center">
                        <motion.div
                            className="lg:w-1/2 mb-12 md:mb-0"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                        >
                            <h1 className="text-5xl font-bold mb-6 mt-32 leading-tight text-gray-900">
                                Decentralized Escrows for{" "}
                                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                                    Secure Web3 Transactions
                                </span>
                            </h1>
                            <p className="text-gray-600 text-lg mb-8">
                                The first fully decentralized escrow service across blockchain
                                networks. Automating trust through smart contracts.
                            </p>
                            <p className="text-gray-600 text-lg font-medium mb-8">
                                CA: {contractAddress}
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="/app"
                                    className="bg-[#fee54f] hover:bg-[#f0d74b] md:px-8 px-4 py-2 md:py-4 rounded-xl text-md md:text-lg items-center font-semibold text-gray-700"
                                >
                                    Get Started
                                </a>
                                <a
                                    href="/docs/home"
                                    target="_blank"
                                    className="border-2 border-[#fee54f] text-gray-700 md:px-8 px-4 py-2 md:py-4 rounded-xl text-md md:text-lg font-semibold hover:bg-yellow-50"
                                >
                                    Learn More
                                </a>
                            </div>
                        </motion.div>
                        <motion.img
                            src="/elektro_token.png"
                            className="h-96 w-96 ml-32 xl:ml-56 mt-32 hidden lg:flex"
                            alt="Elektroscrow"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                        />
                    </div>
                </div>

                {/* What is Elektroscrow? Section */}
                <div className="container max-w-9xl mx-auto px-6 py-20">
                    <motion.div
                        className="items-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                    >
                        <div>
                            <h2 className="text-4xl justify-center flex font-bold mb-10 text-gray-900">
                                What is Elektroscrow?
                            </h2>
                            <p className="text-gray-600 text-xl mb-10">
                                Elektroscrow is the first{" "}
                                <strong>fully decentralized escrow service</strong>, built on
                                robust EVM blockchains to empower
                                <strong> secure</strong> and <strong>private</strong> transactions.
                                By using
                                <strong> immutable smart contracts</strong>, it removes the need
                                for a centralized third party—ensuring both buyer and seller
                                maintain control over their funds until a mutual decision is
                                reached. This <strong>trustless design</strong> not only enhances
                                security but also safeguards user privacy by requiring no personal
                                information beyond wallet addresses.
                            </p>

                            <p className="text-gray-600 text-xl">
                                Whether you’re exchanging digital goods or services, Elektroscrow
                                delivers a<strong> frictionless</strong>,{" "}
                                <strong>transparent</strong>, and
                                <strong> reliable</strong> experience that stands at the
                                <strong> forefront of decentralized finance innovation</strong>.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* What is an Escrow Service? Section */}
                <div className="container max-w-9xl mx-auto px-6 py-20">
                    <motion.div
                        className="items-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                    >
                        <div>
                            <h2 className="text-4xl justify-center flex font-bold mb-10 text-gray-900">
                                What is an Escrow Service?
                            </h2>
                            <p className="text-gray-600 text-xl mb-10">
                                An escrow service is a financial arrangement in which a
                                <strong> neutral third party</strong> holds and regulates the funds
                                or assets on behalf of two parties involved in a transaction. The
                                primary purpose is to add a <strong>layer of protection</strong>{" "}
                                for both the <strong>buyer</strong> and the <strong>seller</strong>
                                , ensuring that neither risks losing their money or product if the
                                other fails to meet agreed terms. Once each side fulfills its
                                obligations—such as delivering goods, services, or making
                                payments—the funds held in escrow are released according to the
                                predetermined conditions. This process fosters trust, mitigates
                                risk, and simplifies dispute resolution, making it an essential
                                mechanism in various types of digital and traditional transactions.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Why Elektroscrow? Section */}
                <div className="container mx-auto px-6 py-20">
                    <motion.h2
                        className=""
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                    >
                        <div className="text-4xl font-bold mb-20 text-center text-gray-900">
                            Why Elektroscrow?
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md ">
                                <div className="w-12 h-12 bg-[#fee54f] rounded-lg flex items-center justify-center mb-6">
                                    <ShieldCheckIcon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">
                                    Fully Decentralized
                                </h3>
                                <p className="text-gray-600">
                                    No intermediaries, powered by immutable smart contracts.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md ">
                                <div className="w-12 h-12 bg-[#fee54f] rounded-lg flex items-center justify-center mb-6">
                                    <LockClosedIcon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">
                                    Secure Transactions
                                </h3>
                                <p className="text-gray-600">
                                    Military-grade security with automated dispute resolution.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md ">
                                <div className="w-12 h-12 bg-[#fee54f] rounded-lg flex items-center justify-center mb-6">
                                    <CpuChipIcon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">
                                    Multi-chain Support
                                </h3>
                                <p className="text-gray-600">
                                    Available on all major EVM-compatible chains.
                                </p>
                            </div>
                        </div>
                    </motion.h2>
                </div>

                {/* How It Works Section */}
                <div className="mt-20 py-20">
                    <div className="container mx-auto px-6">
                        <motion.h2
                            className=""
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                        >
                            <div className="text-4xl font-bold mb-20 text-center text-gray-900">
                                How It Works
                            </div>
                            <div className="grid md:grid-cols-4 gap-8 text-center">
                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md">
                                    <div className="w-12 h-12 bg-[#fee54f] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="font-bold text-xl text-gray-900">1</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 flex justify-center text-gray-900">
                                        Create Escrow
                                    </h3>
                                    <p className="text-gray-600 flex justify-center">
                                        Buyer initiates escrow with seller's address
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md">
                                    <div className="w-12 h-12 bg-[#fee54f] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="font-bold text-xl text-gray-900">2</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 flex justify-center text-gray-900">
                                        Deposit Funds
                                    </h3>
                                    <p className="text-gray-600 flex justify-center">
                                        Both parties deposit required amounts
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md">
                                    <div className="w-12 h-12 bg-[#fee54f] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="font-bold text-xl text-gray-900">3</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 flex justify-center text-gray-900">
                                        Transaction Processing
                                    </h3>
                                    <p className="text-gray-600 flex text-center justify-center">
                                        Smart contract holds funds until mutual decision
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md">
                                    <div className="w-12 h-12 bg-[#fee54f] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="font-bold text-xl text-gray-900">4</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 flex justify-center text-gray-900">
                                        Resolution
                                    </h3>
                                    <p className="text-gray-600 flex text-center justify-center">
                                        Funds released based on mutual agreement
                                    </p>
                                </div>
                            </div>
                        </motion.h2>
                    </div>
                </div>

                {/* Security Section */}
                <div className="container mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                        >
                            <h2 className="text-4xl font-bold text-gray-900">Audited & Secure</h2>
                            <p className="text-gray-600 text-lg">
                                Our smart contracts have been thoroughly audited by SolidProof, and
                                our team has completed KYC verification.
                            </p>
                            <div className="flex space-x-6">
                                <a
                                    href="/audit"
                                    className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 font-semibold"
                                >
                                    Audit Report
                                </a>
                                <a
                                    href="/audit"
                                    className="border-2 border-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50"
                                >
                                    KYC Verification
                                </a>
                            </div>
                        </motion.div>
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
                        >
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <ScaleIcon className="h-8 w-8 text-yellow-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Immutability
                                </h3>
                                <p className="text-gray-600">
                                    Smart contracts cannot be altered once deployed
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <UserGroupIcon className="h-8 w-8 text-yellow-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Community Governance
                                </h3>
                                <p className="text-gray-600">
                                    Future DAO implementation for decentralized control
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <CodeBracketIcon className="h-8 w-8 text-yellow-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Open Source
                                </h3>
                                <p className="text-gray-600">
                                    Transparent codebase for community verification
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-black/95 py-12">
                    <div className="container mx-auto px-6">
                        <div className="pb-4 flex flex-col md:flex-row justify-between">
                            <div className="mb-8 md:mb-0">
                                <div className="flex items-center mb-2">
                                    <img
                                        src="/elektro_adjusted.png"
                                        className="h-16 w-16 mr-1"
                                        alt="Logo"
                                    />
                                    <div>
                                        <h1
                                            className="font-medium text-white text-2xl wdefinedxsm:text-3xl"
                                            style={{ fontFamily: "'Franklin Gothic', sans-serif" }}
                                        >
                                            Elektroscrow
                                        </h1>
                                        <p className="text-gray-100 text-sm">
                                            Decentralized Escrow Protocol
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="space-y-2">
                                    <h3 className="font-bold mb-2 text-white">Protocol</h3>
                                    <a
                                        href="/app"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        Launch App
                                    </a>
                                    <a
                                        href="/how"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        How does it work
                                    </a>
                                    <a
                                        href="/docs/home"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        Documentation
                                    </a>
                                    <a
                                        href="https://github.com/elektroscrow/Elektroscrow_v1"
                                        target="_blank"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        Github
                                    </a>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold mb-2 text-white">Security</h3>
                                    <a
                                        href="/audit"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        Audits
                                    </a>
                                    <a
                                        href="/audit"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        KYC
                                    </a>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold mb-2 text-white">Community</h3>
                                    <a
                                        href="https://x.com/elektroscrow"
                                        target="_blank"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        Twitter
                                    </a>
                                    <a
                                        href="https://t.me/elektroscrow"
                                        target="_blank"
                                        className="block text-gray-400 hover:text-yellow-500"
                                    >
                                        Telegram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
