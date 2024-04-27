'use client'

import React, { useEffect, useState } from "react";

import Typed from 'typed.js';
import { useAnimationProvider } from "@/providers/AnimationProvider";
import { animationTypes } from "../constants/animationTypes";
import { themes } from "../constants/themes";

export default function GreenScreen() {

    const [isDisplayingAnimation, setIsDisplayingAnimation] = useState<boolean>(false)
    const [selectedAnimation, setSelectedAnimation] = useState<string>('')
    const [selectedTheme, setSelectedTheme] = useState<string>('')
    const [classNameAnimation, setClassNameAnimation] = useState<string>('')
    const [classNameTheme, setClassNameTheme] = useState<any>({})
    const [lineDisplayed, setLineDisplayed] = useState<string>('')

    const { state } = useAnimationProvider()

    useEffect(() => {
        if (state.animationState.isAnimationStarting) {
            setSelectedAnimation(state.animationState.animation)
            setSelectedTheme(state.animationState.theme)
            setIsDisplayingAnimation(true)
        }

        if (!state.animationState.isAnimationStarting) {
            setIsDisplayingAnimation(false)
        }

        const animationType = animationTypes.find(item => item.name == selectedAnimation)
        const themeType = themes.find(item => item.name == selectedTheme)

        if (!animationType) {
            return setClassNameAnimation('')
        }

        if (!themeType) {
            return setClassNameTheme('')
        }

        setClassNameAnimation(animationType.style)
        setClassNameTheme(themeType)

    }, [selectedAnimation, selectedTheme, state.animationState.animation, state.animationState.isAnimationStarting, state.animationState.theme])

    useEffect(() => {

        const content = state.contentState.content
        let contentNumber = 1

        if (state.animationState.isAnimationStarting && state.animationState.animation != 'Typing') {

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

        if (state.animationState.isAnimationStarting && state.animationState.animation == 'Typing') {

            const typed = new Typed('#element', {
                strings: state.contentState.content,
                typeSpeed: 30
            });

            return () => {
                typed.destroy();
            };
        }

    }, [state.animationState.isAnimationStarting, state.contentState.content, selectedAnimation, state.animationState.animation]);

    return (
        <div className='col-span-12 lg:col-span-8'>
            <div className='bg-green-screen lg:me-5 h-[32rem] rounded-md flex justify-center'>
                <div className={`${isDisplayingAnimation ? 'flex' : 'hidden'} ${classNameTheme.text} items-center`}>
                    <div
                        className={`${classNameAnimation} ${classNameTheme.style}`}
                        id="element">
                        {lineDisplayed}
                    </div>
                </div>
            </div>
        </div >
    )
}