import Header from "@/components/Header/Header"
import React from "react"

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}