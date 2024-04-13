'use client'

import React, { useEffect, useState } from "react";

import { useAnimationProvider } from "@/providers/AnimationProvider";
import { animationTypes } from "../contants/animationTypes";

export default function GreenScreen() {

    const [isDisplayingAnimation, setIsDisplayingAnimation] = useState<boolean>(false)
    const [selectedAnimation, setSelectedAnimation] = useState<string>('')
    const [classNameAnimation, setClassNameAnimation] = useState<string>('')
    const [lineDisplayed, setLineDisplayed] = useState<string>('')

    const { state } = useAnimationProvider()

    useEffect(() => {
        if (state.animationState.animation) {
            setSelectedAnimation(state.animationState.animation)
        }

        if (state.animationState.isAnimationStarting) {
            setIsDisplayingAnimation(true)
        }

        if (!state.animationState.isAnimationStarting) {
            setIsDisplayingAnimation(false)
        }

        const animationType = animationTypes.find(item => item.name == selectedAnimation)

        if (!animationType) {
            return setClassNameAnimation('')
        }

        setClassNameAnimation(animationType.style)

    }, [selectedAnimation, state.animationState.animation, state.animationState.isAnimationStarting])

    useEffect(() => {

        const content = state.contentState.content
        let contentNumber = 1

        if (state.animationState.isAnimationStarting) {

            setLineDisplayed(content[0])

            const interval = setInterval(() => {
                setLineDisplayed(content[contentNumber])
                contentNumber += 1

                if (contentNumber >= content.length) {
                    contentNumber = 0
                }
            }, 4000);

            return () => clearInterval(interval);
        }

    }, [state.animationState.isAnimationStarting, state.contentState.content, selectedAnimation]);

    return (
        <div className='col-span-12 lg:col-span-8'>
            <div className='bg-green-screen lg:me-5 h-[32rem] rounded-md flex justify-center'>
                <div className={`${isDisplayingAnimation ? 'flex' : 'hidden'} justify-center items-center`}>
                    <div className={classNameAnimation}>
                        {lineDisplayed}
                    </div>
                </div>
            </div>
        </div >
    )
}