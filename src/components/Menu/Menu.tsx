'use client'

import React, { useState } from 'react';
import Button from '@/components/Button/Button'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { ROUTES } from '@/enums/routes';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import './menu.css'

export default function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const router = useRouter()
    const pathname = usePathname()

    const routes = [
        {
            label: "Animate",
            route: ROUTES.ANIMATE
        },
        {
            label: "AI Examples",
            route: ROUTES.EXAMPLES
        },
        {
            label: "About",
            route: ROUTES.ABOUT
        }
    ]

    const redirect = (route: string): void => {
        router.push(route)
        setIsMenuOpen(false)
    }

    const displayMenuItems = routes.map((item) =>
        <div
            key={item.label}
            className={`text-logo-grey hover:underline hover:decoration-logo-green cursor-pointer font-bold mx-2 ${pathname == item.route ? 'underline decoration-logo-green' : ''}`}
            onClick={() => redirect(item.route)}>
            {item.label}
        </div >
    )

    const displayMobileMenuItems = routes.map((item) =>
        <div
            key={item.label}
            className={`py-0.5 px-2 cursor-pointer hover:bg-menu-grey-secondary rounded  ${pathname == item.route ? 'underline decoration-logo-green' : ''}`} onClick={() => redirect(item.route)}
        >{item.label}
        </div>
    )

    return (
        <div className='me-5'>

            <div className='hidden lg:flex '>
                {displayMenuItems}
            </div>

            <div className='lg:hidden relative'>
                {isMenuOpen ?
                    <div
                        className='bg-menu-black border border-menu-grey p-3 absolute end-1 rounded text-logo-grey font-semibold w-[8.7rem] -mt-4'>
                        <div className='flex justify-end mb-[6px]'>
                            <CloseOutlined onClick={() => setIsMenuOpen(false)} />
                        </div>
                        {displayMobileMenuItems}
                    </div >
                    : <Button
                        type='text'
                        icon={<MenuOutlined
                            className='text-logo-grey'
                        />}
                        onClick={() => setIsMenuOpen(true)} />}
            </div >
        </div >
    );
}