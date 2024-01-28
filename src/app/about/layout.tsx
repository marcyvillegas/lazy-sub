import NavigationLayout from "@/layouts/NavigationLayout/NavigationLayout";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <NavigationLayout>
            {children}
        </NavigationLayout>
    )
}