'use client'

import React, { useEffect, useState } from "react";

import { Button } from "@/components";
import { useAnimationProvider } from "@/providers/AnimationProvider";
import { animationTypes } from "../contants/animationTypes";

export default function GreenScreen() {

    const [isDisplayingAnimation, setIsDisplayingAnimation] = useState<boolean>(false)
    const [selectedAnimation, setSelectedAnimation] = useState<string>('')
    const [classNameAnimation, setClassNameAnimation] = useState<string>('')

    const { state } = useAnimationProvider()

    useEffect(() => {
        if (state.animationState.animation) {
            setSelectedAnimation(state.animationState.animation)
        }

        if (state.animationState.isAnimationStarting) {
            setIsDisplayingAnimation(true)
        }

        const animationType = animationTypes.find(item => item.name == selectedAnimation)

        if (!animationType) {
            return setClassNameAnimation('')
        }

        setClassNameAnimation(animationType.style)

    }, [selectedAnimation, state.animationState.animation, state.animationState.isAnimationStarting])

    return (
        <div className='col-span-12 lg:col-span-8'>
            <div className='flex flex-col'>
                <div className='bg-green-screen lg:me-5 h-[32rem] rounded-md flex'>
                    <div className={`${isDisplayingAnimation ? classNameAnimation : ''} ${isDisplayingAnimation ? 'block' : 'hidden'} flex justify-center items-center`}>
                        asdf
                    </div>
                </div>

                <div className='flex justify-end me-5 mt-4'>
                    <Button className='bg-logo-grey text-xl font-bold hover:bg-logo-grey'>
                        Play
                    </Button>
                </div>
            </div>
        </div >
    )
}