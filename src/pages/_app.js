import "@/styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import { Web3Modal } from "../../context/Web3Modal"
import { useEffect } from "react"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"

export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        // Initialize Fathom when the app loads
        Fathom.load("VQIEMLYL", {
            includedDomains: ["https://elektroscrow.com"],
        })

        function onRouteChangeComplete() {
            Fathom.trackPageview()
        }
        // Record a pageview when route changes
        router.events.on("routeChangeComplete", onRouteChangeComplete)

        // Unassign event listener
        return () => {
            router.events.off("routeChangeComplete", onRouteChangeComplete)
        }
    }, [])

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
