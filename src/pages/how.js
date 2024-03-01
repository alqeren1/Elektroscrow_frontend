import Head from "next/head"
//import Header from "../../components/ManualHeader";
import Header from "../../components/Header.js"
import How from "../../components/How"

import BottomBar from "../../components/BottomBar.js"

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Elektroscrow Guide</title>
                <meta name="description" content="How Does Elektroscrow Work?" />
            </Head>
            <div className="bg-[#fffffd] ">
                <Header />
                <div className="flex justify-center mt-10">
                    <How />
                </div>
                <div className="mb-2">
                    <BottomBar />
                </div>
            </div>
        </>
    )
}
