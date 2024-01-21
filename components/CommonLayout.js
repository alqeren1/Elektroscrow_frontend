import Layout from "./Layout"
import { useEffect, useState } from "react"
export default function CommonLayout({ children, layoutOpen, setLayoutOpen }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    useEffect(() => {
        // Check if window is available
        if (typeof window !== "undefined") {
            const checkSize = () => {
                setIsSmallScreen(window.innerWidth < 600)
            }

            window.addEventListener("resize", checkSize)

            // Initial check
            checkSize()

            return () => window.removeEventListener("resize", checkSize)
        }
    }, [])
    if (!isSmallScreen) {
        return (
            <div className="relative min-h-screen flex ">
                {layoutOpen && (
                    <div className="flex-none w-[300px] bg-black lg:block">
                        <Layout setLayoutOpen={setLayoutOpen} />
                    </div>
                )}

                <div className="flex-1">{children}</div>
            </div>
        )
    }

    return (
        <div className={`relative min-h-screen ${layoutOpen ? "overflow-x-hidden" : ""}`}>
            {/* Sidebar */}
            <div
                className={`${
                    layoutOpen ? "block" : "hidden"
                } fixed inset-y-0 left-0 z-30 w-72 bg-black `}
            >
                <Layout setLayoutOpen={setLayoutOpen} />
            </div>

            {/* Main content */}
            <div
                className={`flex-1 transition-transform duration-300 ease-in-out ${
                    layoutOpen ? "transform translate-x-80" : ""
                }`}
            >
                {children}
            </div>
        </div>
    )
}
