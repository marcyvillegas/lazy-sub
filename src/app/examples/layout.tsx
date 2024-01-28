import MainAnimationLayout from "@/layouts/MainAnimationLayout/MainAnimationLayout";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainAnimationLayout>
            {children}
        </MainAnimationLayout>
    )
}