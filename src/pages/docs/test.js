import Layout from "../../../components/Layout"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import How from "../../../components/How"
const inter = Inter({ subsets: ["latin"] })
export default function Home() {
    return (
        <div className="flex">
            <div className="w-[296px] bg-black">
                <Layout />
            </div>
            <div className="bg-pink-200 w-full flex justify-center h-screen ">
                <div className="w-[800px] bg-white h-screen "></div>
            </div>
        </div>
    )
}
