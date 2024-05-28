import NavigationLayout from "@/layouts/NavigationLayout/NavigationLayout";

export default function StartAnimateLayout({ children }: { children: React.ReactNode }) {
    return (
        <NavigationLayout>
            <div className='grid grid-cols-12'>
                {children}
            </div>
        </NavigationLayout>
    )
}