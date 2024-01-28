import NavigationLayout from "@/layouts/NavigationLayout/NavigationLayout";

export default function StartAnimateLayout({ children }: { children: React.ReactNode }) {
    return (
        <NavigationLayout>
            <div className='flex justify-center'>
                {children}
            </div>
        </NavigationLayout>
    )
}