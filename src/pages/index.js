import Head from "next/head"
//import Header from "../../components/ManualHeader";
import Header from "../../components/Header.js"
import ErrorDisplay from "../../components/Error.js"
import BottomBar from "../../components/BottomBar.js"
import backgroundImage from "../../public/background.png"

import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import EscrowFactory from "../../components/EscrowCreate"
import EscrowFactoryWC from "../../components/EscrowCreateWalletConnect"
import React, { useState, useEffect } from "react"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const [error, setError] = useState("")

    useEffect(() => {
        const originalConsoleError = console.error // Save the original console.error function

        // Override console.error to capture error messages
        console.error = (...args) => {
            setError(args.join(" ")) // Update state with the error message
            originalConsoleError.apply(console, args) // Keep the default console error behavior
        }

        // Restore the original console.error when the component is unmounted
        return () => {
            console.error = originalConsoleError
        }
    }, [])
    return (
        <>
            <Head>
                <title>Elektro Escrow</title>
                <meta name="description" content="Smart contract lottery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-[#fffffd] flex flex-col min-h-screen">
                <Header />

                <div className="flex flex-1 justify-center items-center">
                    <div>
                        {" "}
                        <EscrowFactory />
                        <div className="flex justify-center relative z-10">
                            <ErrorDisplay errorMessage={error} />
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <BottomBar />
                </div>
            </div>
        </>
    )
}
