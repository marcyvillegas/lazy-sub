import Header from "@/components/Header/Header"
import React from "react"

export default function MainAnimationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}