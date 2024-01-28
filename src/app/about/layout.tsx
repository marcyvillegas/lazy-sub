import MainAnimationLayout from "@/layouts/MainAnimationLayout/MainAnimationLayout";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainAnimationLayout>
            {children}
        </MainAnimationLayout>
    )
}