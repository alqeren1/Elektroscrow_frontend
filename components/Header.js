import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="p-3 border-b-2 flex flex-row bg-white rounded-b-2xl justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl text-blue-700 opacity-70">
                Elektro Escrow
            </h1>

            <ConnectButton moralisAuth={false} />
        </div>
    )
}
