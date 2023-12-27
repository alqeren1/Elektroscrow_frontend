import "@/styles/globals.css"

import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import { Web3Modal } from "../../context/Web3Modal"

export default function App({ Component, pageProps }) {
    return (
        <Web3Modal>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </Web3Modal>
    )
}
