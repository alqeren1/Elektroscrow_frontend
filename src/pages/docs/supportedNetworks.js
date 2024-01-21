import CommonLayout from "../../../components/CommonLayout"
import Menu from "../../../svgs/menu"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
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
                        <h1 className="font-bold text-3xl mt-14 p-4 text-left">
                            Introduction to Elektroscrow
                        </h1>
                        <div className="flex justify-center">
                            <img
                                src="/elektrodocs.png"
                                alt="Logo"
                                className=" px-4 flex justify-center"
                            />
                        </div>
                        <div className="px-4 py-4 ">
                            <div className="mt-2 ">
                                Elektroscrow is a cutting-edge platform where trust and technology
                                converge to facilitate secure, decentralized exchanges between
                                buyers and sellers. It is the{" "}
                                <span className="font-bold">first fully decentralized</span> escrow
                                service available. In an era where digital transactions are
                                increasingly becoming the norm, Elektroscrow emerges as a beacon of
                                innovation and security in decentralized finance to solve the
                                problem of trusting centralized escrow services and dispose the
                                need for trusting a third party. Electro Escrow is not just an
                                escrow service; it is a transformative approach to facilitating
                                secure, private transactions between buyers and sellers. Built on
                                the robust Ethereum blockchain, Elektroscrow employs smart
                                contracts to ensure that every transaction is protected, private,
                                and users never need to trust a third-party establishment.
                            </div>
                        </div>
                        <div className="px-4 py-4 mt-8 ">
                            <h1 className="font-medium text-3xl text-left ">
                                The Immutable Foundation of Elektroscrow
                            </h1>
                            <div className="mt-2">
                                The cornerstone of Elektroscrow is its suite of smart contracts,
                                designed to be immutable and self-executing. These contracts, once
                                deployed on the Ethereum blockchain, become unalterable. This
                                immutability is crucial, as it guarantees the integrity of every
                                transaction. No entity, including Elektroscrow’s developers, can
                                modify these contracts once they are active, ensuring a level of
                                trust and consistency unparalleled in traditional escrow services.
                            </div>
                        </div>
                        <div className="px-4 py-4 mt-8">
                            <h1 className="font-medium text-3xl text-left">
                                Prioritizing User Privacy and Autonomy
                            </h1>
                            <div className="mt-2">
                                At Elektroscrow, the privacy and autonomy of users are paramount.
                                The platform empowers users by allowing them to maintain control
                                over their funds until a mutual consensus is reached in the
                                transaction. This approach not only enhances security but also
                                preserves the anonymity of all parties involved. Users engage in
                                transactions without the need to disclose personal details, thus
                                fostering a secure environment for private exchanges.
                            </div>
                        </div>
                        <div className="px-4 py-4 mt-8">
                            <h1 className="font-medium text-3xl text-left">
                                Elektroscrow's Operational Mechanics
                            </h1>
                            <div className="mt-2">
                                <span className="font-bold">Initiating a Transaction:</span> A
                                transaction on Elektroscrow begins with the creation of an escrow
                                contract by the buyer. This contract includes critical details like
                                the seller’s address, the type of payment token, and the amount
                                involved.
                            </div>
                            <div className="mt-2">
                                <span className="font-bold">Securing funds:</span> Following
                                contract creation, the buyer or selelr deposits the specified token
                                amount into the contract, signaling the start of the
                            </div>
                            <div className="mt-2">
                                <span className="font-bold">Engagement from Both Parties:</span>{" "}
                                The escrow is set into motion once the seller matches the buyer’s
                                commitment, or vice versa, by also depositing funds into the
                                contract. Importantly, Elektroscrow offers the flexibility for
                                either party to withdraw their funds before the escrow activates,
                                ensuring a risk-free environment for initial engagement.
                            </div>
                            <div className="mt-2">
                                <span className="font-bold">Finalizing the Transaction:</span> The
                                transaction reaches its conclusion when both parties agree on the
                                outcome, whether it be a refund or the acceptance of terms. Upon
                                reaching this mutual decision, the escrow contract executes the
                                agreed action, thus securely finalizing the transaction.
                            </div>
                        </div>
                        <div className="px-4 py-4 mt-8">
                            <h1 className="font-medium text-3xl text-left">
                                Expansive Network Reach
                            </h1>
                            <div className="mt-2">
                                Elektroscrow’s primary operations are anchored in the Ethereum
                                network, catering to its versatility and widespread adoption.
                                However, recognizing the diverse needs of the blockchain community,
                                Elektroscrow extends its services to various Ethereum derivative
                                networks, thereby enhancing its accessibility and utility across
                                different blockchain ecosystems.
                            </div>
                        </div>
                        <div className="px-4 pb-28 py-4 mt-8">
                            <h1 className="font-medium text-3xl text-left">
                                A Vanguard of Decentralized Escrows
                            </h1>
                            <div className="mt-2">
                                Elektroscrow stands at the forefront of revolutionizing escrow
                                services within the blockchain domain by making them utterly
                                decentralized. Its commitment to leveraging the power of smart
                                contracts for ensuring immutable, autonomous, and confidential
                                transactions sets a new benchmark in the world of digital finance.
                                Elektroscrow is more than just a platform; it's a testament to the
                                potential of decentralized, secure, and private financial
                                transactions in the modern era.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    )
}
