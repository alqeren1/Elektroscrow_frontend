import Layout from "../../../components/Layout"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import How from "../../../components/How"
const inter = Inter({ subsets: ["latin"] })
export default function Home() {
    return (
        <div className="flex">
            <div className="w-[1285px]">
                <Layout />
            </div>
            <div className="px-28 py-4 text-base text-justify font-light ">
                <h1 className="font-bold text-2xl p-4">Introduction to Elektro Escrow</h1>
                <div className="bg-black w-[765px]  ml-4 py-[150px] items-center text-white">
                    <div className="ml-[350px]"> Image</div>
                </div>
                <div className="px-4 py-4">
                    <div className="mt-2">
                        Elektro Escrow is a cutting-edge platform where trust and technology
                        converge to facilitate secure, decentralized exchanges between buyers and
                        sellers. It is the{" "}
                        <span className="font-bold">first fully decentralized</span> escrow service
                        available. In an era where digital transactions are increasingly becoming
                        the norm, Elektro Escrow emerges as a beacon of innovation and security in
                        decentralized finance to solve the problem of trusting centralized escrow
                        services and dispose the need for trusting a third party. Electro Escrow is
                        not just an escrow service; it is a transformative approach to facilitating
                        secure, private transactions between buyers and sellers. Built on the
                        robust Ethereum blockchain, Elektro Escrow employs smart contracts to
                        ensure that every transaction is protected, private, and users never need
                        to trust a third-party establishment.
                    </div>
                </div>
                <div className="px-4 py-4 mt-8">
                    <h1 className="font-bold text-2xl">
                        The Immutable Foundation of Elektro Escrow
                    </h1>
                    <div className="mt-2">
                        The cornerstone of Elektro Escrow is its suite of smart contracts, designed
                        to be immutable and self-executing. These contracts, once deployed on the
                        Ethereum blockchain, become unalterable. This immutability is crucial, as
                        it guarantees the integrity of every transaction. No entity, including
                        Elektro Escrow’s developers, can modify these contracts once they are
                        active, ensuring a level of trust and consistency unparalleled in
                        traditional escrow services.
                    </div>
                </div>
                <div className="px-4 py-4 mt-8">
                    <h1 className="font-bold text-2xl">Prioritizing User Privacy and Autonomy</h1>
                    <div className="mt-2">
                        At Elektro Escrow, the privacy and autonomy of users are paramount. The
                        platform empowers users by allowing them to maintain control over their
                        funds until a mutual consensus is reached in the transaction. This approach
                        not only enhances security but also preserves the anonymity of all parties
                        involved. Users engage in transactions without the need to disclose
                        personal details, thus fostering a secure environment for private
                        exchanges.
                    </div>
                </div>
                <div className="px-4 py-4 mt-8">
                    <h1 className="font-bold text-2xl">Elektro Escrow's Operational Mechanics</h1>
                    <div className="mt-2">
                        <span className="font-bold">1-Initiating a Transaction:</span> A
                        transaction on Elektro Escrow begins with the creation of an escrow
                        contract by the buyer. This contract includes critical details like the
                        seller’s address, the type of payment token, and the amount involved.
                    </div>
                    <div className="mt-2">
                        <span className="font-bold">2-Securing funds:</span> Following contract
                        creation, the buyer or selelr deposits the specified token amount into the
                        contract, signaling the start of the
                    </div>
                    <div className="mt-2">
                        <span className="font-bold">3-Engagement from Both Parties:</span> The
                        escrow is set into motion once the seller matches the buyer’s commitment,
                        or vice versa, by also depositing funds into the contract. Importantly,
                        Elektro Escrow offers the flexibility for either party to withdraw their
                        funds before the escrow activates, ensuring a risk-free environment for
                        initial engagement.
                    </div>
                    <div className="mt-2">
                        <span className="font-bold">4-Finalizing the Transaction:</span> The
                        transaction reaches its conclusion when both parties agree on the outcome,
                        whether it be a refund or the acceptance of terms. Upon reaching this
                        mutual decision, the escrow contract executes the agreed action, thus
                        securely finalizing the transaction.
                    </div>
                </div>
                <div className="px-4 py-4 mt-8">
                    <h1 className="font-bold text-2xl">Expansive Network Reach</h1>
                    <div className="mt-2">
                        Elektro Escrow’s primary operations are anchored in the Ethereum network,
                        catering to its versatility and widespread adoption. However, recognizing
                        the diverse needs of the blockchain community, Elektro Escrow extends its
                        services to various Ethereum derivative networks, thereby enhancing its
                        accessibility and utility across different blockchain ecosystems.
                    </div>
                </div>
                <div className="px-4 pb-28 py-4 mt-8">
                    <h1 className="font-bold text-2xl">A Vanguard of Decentralized Escrows</h1>
                    <div className="mt-2">
                        Elektro Escrow stands at the forefront of revolutionizing escrow services
                        within the blockchain domain by making them utterly decentralized. Its
                        commitment to leveraging the power of smart contracts for ensuring
                        immutable, autonomous, and confidential transactions sets a new benchmark
                        in the world of digital finance. Elektro Escrow is more than just a
                        platform; it's a testament to the potential of decentralized, secure, and
                        private financial transactions in the modern era.
                    </div>
                </div>
            </div>
        </div>
    )
}
