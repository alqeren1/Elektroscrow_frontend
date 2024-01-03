import Head from "next/head"
//import Header from "../../components/ManualHeader";
import Header from "../../components/Header.js"
import backgroundImage from "../../public/background.png"

import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import EscrowFactory from "../../components/EscrowCreate"
import EscrowFactoryWC from "../../components/EscrowCreateWalletConnect"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Elektro Escrow</title>
                <meta name="description" content="Smart contract lottery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-[#fffdf1]">
                <div
                    className="bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${"/2elektro.png"})`,
                        width: "100vw",
                        height: "100vh",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: -1,
                    }}
                ></div>
                <Header />

                <div
                    className="flex justify-center items-center "
                    style={{
                        minHeight: "92vh",
                    }}
                >
                    <EscrowFactory />
                </div>
            </div>
        </>
    )
}
