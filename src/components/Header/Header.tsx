'use client'

import React from 'react';
import Menu from '../Menu/Menu';

export default function Header() {

    return (
        <div className="bg-secondary-background m-5 rounded flex justify-between items-center lg:items-baseline">
            <div className="flex text-3xl lg:text-5xl font-bold p-3">
                <div className="text-logo-grey">Lazy</div>
                <div className="text-logo-green">Sub</div>
            </div>

            <Menu />
        </div >
    );
}