'use client'

import React, { useState } from 'react';
import Button from '@/components/Button/Button'
import { MenuOutlined } from '@ant-design/icons';
import { ROUTES } from '@/enums/routes';
import { useRouter } from 'next/navigation';
import './menu.css'

export default function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const router = useRouter()

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

    const displayMobileMenuItems = routes.map((item) =>
        <div
            key={item.label}
            className='py-0.5 px-2 cursor-pointer hover:bg-menu-grey-secondary rounded'
            onClick={() => redirect(item.route)}
        >{item.label}
        </div>
    )

    return (
        <div className='me-5'>

            <div className='hidden lg:block'>
                <div
                    className='py-0.5 px-2 cursor-pointer hover:bg-menu-grey-secondary rounded'
                >About</div>
            </div>

            <div className='lg:hidden relative'>
                {!isMenuOpen ?
                    <Button
                        type='text'
                        icon={<MenuOutlined
                            className='text-logo-grey'
                        />}
                        onClick={() => setIsMenuOpen(prevData => !prevData)}
                        className={`${isMenuOpen ? 'bg-main-background' : ''}`}
                    /> : <></>}

                {isMenuOpen ?
                    <div
                        className='bg-menu-black border border-menu-grey p-3 absolute end-1 rounded text-logo-grey font-semibold w-[8.7rem] -mt-4'>
                        {displayMobileMenuItems}
                        <div
                            className='py-0.5 px-2 cursor-pointer hover:bg-menu-red rounded'
                            onClick={() => setIsMenuOpen(false)}
                        >Close
                        </div>
                    </div >
                    : <></>
                }

            </div >
        </div >
    );
}