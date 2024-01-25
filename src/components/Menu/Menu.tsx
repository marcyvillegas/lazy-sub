'use client'

import React, { useState } from 'react';
import Button from '@/components/Button/Button'
import { MenuOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter()

    return (
        <div className='me-5'>

            <div>

            </div>

            <div className='md:hidden relative'>
                <Button
                    type='text'
                    icon={<MenuOutlined
                        className='text-logo-grey'
                    />}
                    onClick={() => setIsMenuOpen(prevData => !prevData)}
                />
                <div className={`bg-menu-black border border-menu-grey p-3 absolute end-1 rounded text-logo-grey font-semibold ${isMenuOpen ? '' : 'hidden'}`}>
                    <div className='py-0.5 px-4 cursor-pointer hover:bg-menu-grey-secondary rounded'>Animate</div>
                    <div className='py-0.5 px-4 cursor-pointer hover:bg-menu-grey-secondary rounded'>About</div>
                    <div className='py-0.5 px-4 cursor-pointer hover:bg-menu-grey-secondary rounded'>Videos</div>
                </div>
            </div>
        </div>
    );
}