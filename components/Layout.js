import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"

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
    useEffect(() => {
        menuItems.forEach((item) => {
            router.prefetch(item.href)
        })
    }, [router])

    return (
        <div className="min-h-screen flex">
            <aside className="bg-[#f7f7f7] w-64  fixed inset-0  border-r border-gray-300 overflow-y-auto ">
                <nav>
                    <div className="font-bold text-lg px-4 py-4 bg-white ">Escrow Docs</div>
                    <div className="border-b w-full border-gray-300"></div>
                    <ul className="mt-5">
                        {menuItems.map(({ href, title }) => (
                            <li key={title} className="mb-2 ">
                                <Link
                                    href={href}
                                    className={`block px-4 py-2  hover:bg-[#ededed] text-sm  ${
                                        router.asPath == href
                                            ? "bg-[#ededed] font-normal "
                                            : "font-extralight"
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
    )
}
