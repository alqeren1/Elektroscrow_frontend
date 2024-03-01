import Head from "next/head"
//import Header from "../../components/ManualHeader";
import Header from "../../components/Header.js"
import Audit from "../../components/Audit"

import BottomBar from "../../components/BottomBar.js"

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Elektroscrow Audit</title>
                <meta name="description" content="Elektroscrow Audit and KYC info" />
            </Head>
            <div className="bg-[#fffffd] ">
                <Header />
                <div className="flex justify-center mt-10">
                    <Audit />
                </div>
                <div className="mb-2">
                    <BottomBar />
                </div>
            </div>
        </>
    )
}
