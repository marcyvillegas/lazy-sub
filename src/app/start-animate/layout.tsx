import NavigationLayout from "@/layouts/NavigationLayout/NavigationLayout";
import { AnimationProvider } from "@/providers/AnimationProvider";

export default function StartAnimateLayout({ children }: { children: React.ReactNode }) {
    return (
        <AnimationProvider>
            <NavigationLayout>
                <div className='grid grid-cols-12'>
                    {children}
                </div>
            </NavigationLayout>
        </AnimationProvider>
    )
}