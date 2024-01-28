import NavigationLayout from "@/layouts/NavigationLayout/NavigationLayout";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
    return (
        <NavigationLayout>
            {children}
        </NavigationLayout>
    )
}