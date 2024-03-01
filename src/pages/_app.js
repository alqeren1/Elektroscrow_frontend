import "@/styles/globals.css"

import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import { Web3Modal } from "../../context/Web3Modal"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = () => {
            if (window.fathom) {
                window.fathom.trackPageview()
            }
        }

        router.events.on("routeChangeComplete", handleRouteChange)

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router.events])
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
