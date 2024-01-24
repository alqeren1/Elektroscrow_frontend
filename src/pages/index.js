import Head from "next/head"
//import Header from "../../components/ManualHeader";
import Header from "../../components/Header.js"
import ErrorDisplay from "../../components/Error.js"
import BottomBar from "../../components/BottomBar.js"

import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import EscrowFactory from "../../components/EscrowCreate"
import EscrowFactoryWC from "../../components/EscrowCreateWalletConnect"
import React, { useState, useEffect } from "react"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const [error, setError] = useState("")

    const handleError = (errorMessage) => {
        setError(errorMessage)
    }
    return (
        <>
            <Head>
                <title>Elektroscrow</title>
                <meta name="description" content="Smart contract lottery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/elektro_adjusted.png" />
            </Head>
            <div className="bg-[#fffffd] flex flex-col min-h-screen">
                <div className="z-10">
                    <Header />
                </div>

                <div className="flex flex-1 justify-center items-center">
                    <div className=" w-full">
                        {" "}
                        <EscrowFactory onError={handleError} />
                        {error && (
                            <div className="flex justify-center relative z-10">
                                <ErrorDisplay errorMessage={error} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-2">
                    <BottomBar />
                </div>
            </div>
        </>
    )
}
