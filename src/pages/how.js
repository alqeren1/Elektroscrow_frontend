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
                <title>Elektroscrow</title>
                <meta name="description" content="Smart contract lottery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/elektro_adjusted.png" />
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
