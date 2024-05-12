'use client'

import React, { useEffect, useState } from "react";

import { useAnimationProvider } from "@/providers/AnimationProvider";
import { animationTypes, fontSizes, fonts, themes } from "../constants";
import useDisplayAnimation from "@/hooks/useDisplayAnimation";

export default function GreenScreen() {

    const [isDisplayingAnimation, setIsDisplayingAnimation] = useState<boolean>(false)
    const [selectedAnimation, setSelectedAnimation] = useState<string>('')
    const [selectedTheme, setSelectedTheme] = useState<string>('')
    const [selectedFont, setSelectedFont] = useState<string>('')
    const [selectedFontSize, setSelectedFontSize] = useState<number>(0)

    const [classNameAnimation, setClassNameAnimation] = useState<string>('')
    const [classNameTheme, setClassNameTheme] = useState<any>({})
    const [classNameFont, setClassNameFont] = useState<string>('')
    const [classNameFontSize, setClassNameFontSize] = useState<string>('')
    const [lineDisplayed, setLineDisplayed] = useState<string>('')

    const { state } = useAnimationProvider()
    useDisplayAnimation(
        setLineDisplayed,
        selectedAnimation,
        selectedFont,
        selectedFontSize
    )

    useEffect(() => {
        if (state.animationState.isAnimationStarting) {
            setSelectedAnimation(state.animationState.animation)
            setSelectedTheme(state.animationState.theme)
            setSelectedFont(state.animationState.font)
            setSelectedFontSize(state.animationState.fontSize)
            setIsDisplayingAnimation(true)
        }

        if (!state.animationState.isAnimationStarting) {
            setIsDisplayingAnimation(false)
        }

        const animationType = animationTypes.find(item => item.name == selectedAnimation)
        const themeType = themes.find(item => item.name == selectedTheme)
        const fontType = fonts.find(item => item.name == selectedFont)
        const fontSizeType: any = fontSizes.find(item => item.name == selectedFontSize)

        if (!animationType) {
            return setClassNameAnimation('')
        }

        if (!themeType) {
            return setClassNameTheme('')
        }

        if (!fontType) {
            return setClassNameFont('')
        }

        if (!fontSizeType) {
            return setClassNameFontSize('')
        }

        setClassNameAnimation(animationType.style)
        setClassNameTheme(themeType)
        setClassNameFont(fontType.style)
        setClassNameFontSize(fontSizeType.style)

    }, [selectedAnimation, selectedFont, selectedFontSize, selectedTheme, state.animationState.animation, state.animationState.font, state.animationState.fontSize, state.animationState.isAnimationStarting, state.animationState.theme])

    console.log(classNameFont)

    return (
        <div className='col-span-12 lg:col-span-8'>
            <div className='bg-green-screen lg:me-5 h-[32rem] rounded-md flex justify-center'>
                <div className={`${isDisplayingAnimation ? 'flex' : 'hidden'} ${classNameTheme.text} items-center w-3/5 ${classNameFontSize}`}>
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