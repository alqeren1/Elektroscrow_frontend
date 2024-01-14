import Head from "next/head"
//import Header from "../../components/ManualHeader";
import Header from "../../components/Header.js"
import How from "../../components/How"
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
                <title>Elektroscrow</title>
                <meta name="description" content="Smart contract lottery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/elektro_adjusted.png" />
            </Head>
            <div className="bg-[#fffffd] ">
                <Header />
                <div className="px-10 mt-10">
                    <How />
                </div>
            </div>
        </>
    )
}
