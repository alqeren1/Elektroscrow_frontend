import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import Menu from "../svgs/menu"

const menuItems = [
    { href: "/docs/home", title: "Introduction" },
    { href: "/docs/how", title: "How does it work?" },
    { href: "/docs/trust", title: "Why would you trust Elektroscrow?" },
    { href: "/docs/decentralization", title: "How is it fully decentralized?" },
    { href: "/docs/anonimity", title: "How is it anonymous?" },
    { href: "/docs/newEscrow", title: "Starting a new escrow" },
    { href: "/docs/paymentToken", title: "Tokens to use for payment" },
    { href: "/docs/depositing", title: "Funding the contract" },
    { href: "/docs/safetyDeposit", title: "Safety deposit" },
    { href: "/docs/withdrawing", title: "Withdrawing" },
    { href: "/docs/contractBalance", title: "Contract balance" },
    { href: "/docs/initialization", title: "Initialization" },

    { href: "/docs/escrowStatus", title: "Escrow status" },
    { href: "/docs/fee", title: "Protocol fee" },
    { href: "/docs/supportedNetworks", title: "Supported networks" },

    { href: "/docs/links", title: "Links" },
]

export default function Layout({ children, setLayoutOpen }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Elektroscrow Docs</title>
                <meta name="description" content="Decentralized escrow transactions" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/elektro_adjusted.png" />
            </Head>
            <div className="min-h-screen flex">
                <aside className="bg-[#f7f7f7] w-[300px]  fixed inset-0  border-r border-gray-300  ">
                    <nav>
                        <div className="sticky top-0 bg-white z-10">
                            <div className=" flex  bg-white w-full items-center">
                                <a href="/" className="flex items-center">
                                    <img
                                        src="/elektro_adjusted.png"
                                        alt="Logo"
                                        className="h-9 w-9  ml-2 mt-1"
                                    />
                                    <div
                                        className="font-medium text-xl  py-4  text-gray-900 "
                                        style={{ fontFamily: "'Franklin Gothic', sans-serif" }}
                                    >
                                        Elektroscrow Docs
                                    </div>{" "}
                                </a>

                                <button
                                    onClick={() => setLayoutOpen(false)}
                                    className=" absolute mt-1 right-0  text-gray-400 hover:text-gray-700 wdefinedxxxsm:mr-2 mr-6"
                                >
                                    <Menu />
                                </button>
                            </div>
                            <div className="border-b w-full border-gray-300"></div>
                        </div>
                        <div className="custom-scrollbar overflow-y-auto max-h-[calc(100vh-110px)]">
                            <ul className="mt-5">
                                <div className="px-4 mb-2  opacity-50 ">GENERAL</div>
                                {menuItems.map(({ href, title }) => (
                                    <div className="px-1">
                                        <li
                                            key={title}
                                            className={`mb-2  border-2  rounded-xl ${
                                                router.asPath == href
                                                    ? "bg-[#ededed] "
                                                    : "bg-gray-50 border-dotted"
                                            }`}
                                        >
                                            <Link
                                                href={href}
                                                className={`block px-4 py-2  hover:bg-[#ededed] text-lsm text-gray-800 ${
                                                    router.asPath == href
                                                        ? " font-bold text-black"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {title}
                                            </Link>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </aside>
                <main className="flex-1 p-4">{children}</main>
            </div>
        </>
    )
}
