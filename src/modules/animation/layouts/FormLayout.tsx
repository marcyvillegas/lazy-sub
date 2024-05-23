'use client'

import React, { useState } from 'react';
import ContentForm from '../components/ContentForm';
import AnimationForm from '../components/AnimationForm';
import { useAnimationStore } from '@/stores/animationStore';

export default function FormLayout() {

    const [activateForm, setActiveForm] = useState<string>('Content');
    const { contentState, updateAnimation } = useAnimationStore();

    const handleRedirectToContent = () => {
        updateAnimation({ isAnimationStarting: false });
        setActiveForm("Content");
    }

    const handleRedirectToAnimation = () => {
        if (contentState.content.length != 0
            && contentState.content[0].trim() != "") {
            return setActiveForm("Animation")
        }
    }

    return (
        <div className='bg-secondary-background col-span-12 mt-2 lg:mt-0 lg:col-span-4 rounded-md p-5'>
            <div className='flex justify-center'>
                <div className={`bg-grey-tab py-2 w-full mx-2 font-bold rounded-sm cursor-pointer flex justify-center ${activateForm == 'Content' ? 'border-b-4 border-b-logo-green text-logo-green' : 'text-white-tab'}`}
                    onClick={handleRedirectToContent}>
                    Content
                </div>

                <div className={`bg-grey-tab py-2 w-full mx-2 font-bold rounded-sm cursor-pointer flex justify-center ${activateForm == 'Animation' ? 'border-b-4 border-b-logo-green text-logo-green' : 'text-white-tab'}`}
                    onClick={handleRedirectToAnimation}>
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