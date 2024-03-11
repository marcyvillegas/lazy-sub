'use client'

import React, { useState } from "react";

import { Button } from "@/components";
import { useAnimationProvider } from "@/providers/AnimationProvider";
import { animationTypes } from "../contants/animationTypes";

export default function GreenScreen() {

    const [isDisplayingAnimation, setIsDisplayingAnimation] = useState(false)

    const { state, dispatch } = useAnimationProvider()

    console.log(state)

    const getClassName = () => {
        const animationType = animationTypes.find(item => item.name == state.animationState.animation)

        if (!animationType) {
            return ''
        }

        setIsDisplayingAnimation(true)
        return animationType.style
    }

    return (
        <div className='col-span-12 lg:col-span-8'>
            <div className='flex flex-col'>
                <div className='bg-green-screen lg:me-5 h-[32rem] rounded-md flex'>
                    <div className={`${state.animationState.isAnimationStarting ? getClassName() : ''} ${state.animationState.isAnimationStarting ? 'block' : 'hidden'}`}>
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