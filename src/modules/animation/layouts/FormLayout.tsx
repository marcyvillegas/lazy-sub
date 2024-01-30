'use client'

import React, { useState } from 'react';
import ContentForm from '../components/ContentForm';
import AnimationForm from '../components/AnimationForm';

export default function FormLayout() {

    const [activateForm, setActiveForm] = useState<string>("Content")

    return (
        <div className='bg-secondary-background col-span-12 mt-2 lg:mt-0 lg:col-span-4 rounded-md p-5'>
            <div className='flex justify-center'>
                <div className={`bg-grey-tab py-2 px-14 mx-2 font-bold rounded-sm cursor-pointer ${activateForm == 'Content' ? 'border-b-4 border-b-logo-green text-logo-green' : 'text-white-tab'}`}
                    onClick={() => setActiveForm("Content")}>
                    Content
                </div>

                <div className={`bg-grey-tab py-2 px-14 mx-2 font-bold rounded-sm cursor-pointer ${activateForm == 'Animation' ? 'border-b-4 border-b-logo-green text-logo-green' : 'text-white-tab'}`}
                    onClick={() => setActiveForm("Animation")}>
                    Animation
                </div>
            </div>

            <div className='m-5'>
                {activateForm == 'Content' ?
                    <ContentForm />
                    : <AnimationForm />}
            </div>
        </div>
    )
}