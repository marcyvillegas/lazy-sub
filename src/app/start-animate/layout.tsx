import React from "react"
import MainAnimationLayout from "@/layouts/MainAnimationLayout/MainAnimationLayout"

export default function StartAnimeLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainAnimationLayout>
            {children}
        </MainAnimationLayout>
    )
}