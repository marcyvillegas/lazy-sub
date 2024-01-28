import MainAnimationLayout from "@/layouts/MainAnimationLayout/MainAnimationLayout";

export default function StartAnimateLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainAnimationLayout>
            {children}
        </MainAnimationLayout>
    )
}