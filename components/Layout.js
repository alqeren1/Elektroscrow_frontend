import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

const menuItems = [
    { href: "/docs/home", title: "Introduction" },
    { href: "/docs/how", title: "How does it work?" },
    { href: "/docs/decentralization", title: "How is it fully decentralized?" },
    { href: "/docs/anonimity", title: "How is it anonymous?" },
    { href: "/docs/newEscrow", title: "Starting a new escrow" },
    { href: "/docs/paymentToken", title: "Token to use for payment" },
    { href: "/docs/depositing", title: "Depositing" },
    { href: "/docs/safetyDeposit", title: "Safety deposit" },
    { href: "/docs/contractBalance", title: "Contract balance" },
    { href: "/docs/initialization", title: "Initialization" },
    { href: "/docs/withdrawing", title: "Withdrawing" },

    { href: "/docs/escrowStatus", title: "Escrow status" },
    { href: "/docs/supportedNetworks", title: "Supported networks" },
    { href: "/docs/connectingWallet", title: "How to connect your wallet?" },
    { href: "/docs/roadmap", title: "Roadmap" },
]

export default function Layout({ children }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Elektroscrow Docs</title>
                <meta name="description" content="Smart contract lottery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/elektro_adjusted.png" />
            </Head>
            <div className="min-h-screen flex">
                <aside className="bg-[#f7f7f7] w-[300px]  fixed inset-0  border-r border-gray-300 overflow-y-auto ">
                    <nav>
                        <div className="flex  bg-white w-full items-center">
                            <img
                                src="/elektro_adjusted.png"
                                alt="Logo"
                                className="h-10 w-10 mr-1 ml-2 mt-1"
                            />
                            <div className="font-bold text-xl  py-4  text-gray-800 ">
                                Elektroscrow Docs
                            </div>
                        </div>
                        <div className="border-b w-full border-gray-300"></div>
                        <ul className="mt-5">
                            <div className="px-4 mb-2  opacity-50 ">GENERAL</div>
                            {menuItems.map(({ href, title }) => (
                                <li key={title} className="mb-3 ">
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
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-4">{children}</main>
            </div>
        </>
    )
}
