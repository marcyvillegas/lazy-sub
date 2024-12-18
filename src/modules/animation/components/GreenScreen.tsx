/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState, useRef } from 'react'

import { animationTypes, fontSizes, themes } from '../constants'
import useDisplayAnimation from '@/hooks/useDisplayAnimation'
import { useAnimationStore } from '@/stores/animationStore'
import '@/modules/animation/animation.css'

export default function GreenScreen() {
  const [isDisplayingAnimation, setIsDisplayingAnimation] =
    useState<boolean>(false)

  const [classNameAnimation, setClassNameAnimation] = useState<string>('')
  const [classNameTheme, setClassNameTheme] = useState<any>({})
  // const [classNameFont, setClassNameFont] = useState<string>('')
  const [classNameFontSize, setClassNameFontSize] = useState<string>('')
  const [lineDisplayed, setLineDisplayed] = useState<string>('')

  const contentRef: React.LegacyRef<HTMLDivElement> | null = useRef(null)

  const [counterChatBubble, setCounterChatBubble] = useState<number>(0)
  const [displayFistBubble, setDisplayFistBubble] = useState<boolean>(true)
  const [displaySecondBubble, setDisplaySecondBubble] = useState<boolean>(true)
  const [displayTyping, setDisplayTyping] = useState<boolean>(false)

  const { animationState } = useAnimationStore()
  useDisplayAnimation(
    setLineDisplayed,
    contentRef,
    counterChatBubble,
    setCounterChatBubble,
    setDisplayFistBubble,
    setDisplaySecondBubble,
    setDisplayTyping
  )

  useEffect(() => {
    if (animationState.isAnimationStarting) {
      setIsDisplayingAnimation(true)
    }

    if (!animationState.isAnimationStarting) {
      setIsDisplayingAnimation(false)
    }

    const animationType = animationTypes.find(
      (item) => item.name == animationState.animation
    )
    const themeType = themes.find((item) => item.name == animationState.theme)
    // const fontType = fonts.find((item) => item.name == selectedFont)
    const fontSizeType: any = fontSizes.find(
      (item) => item.name == animationState.fontSize
    )

    if (!animationType) {
      return setClassNameAnimation('')
    }

    if (!themeType) {
      return setClassNameTheme('')
    }

    // if (!fontType) {
    //   return setClassNameFont('')
    // }

    if (!fontSizeType) {
      return setClassNameFontSize('')
    }

    setClassNameAnimation(animationType.style)
    setClassNameTheme(themeType)
    // setClassNameFont(fontType.style)
    setClassNameFontSize(fontSizeType.style)
  }, [
    animationState.animation,
    animationState.font,
    animationState.fontSize,
    animationState.isAnimationStarting,
    animationState.theme,
  ])

  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="bg-green-screen lg:me-5 h-[32rem] rounded-md flex justify-center">
        <div
          className={`${isDisplayingAnimation ? 'flex' : 'hidden'} ${classNameTheme.text} items-center w-3/5 ${classNameFontSize}`}
        >
          <div
            className={`${!displayTyping ? 'block' : 'hidden'} ${animationState.animation == 'Chat Bubble' ? 'hidden' : 'flex'} ${classNameAnimation} ${classNameTheme.style}`}
            ref={contentRef}
          >
            {lineDisplayed}
          </div>

          <div
            className={`${displayTyping ? 'block' : 'hidden'} ${animationState.animation == 'Chat Bubble' ? 'hidden' : 'flex'} ${classNameAnimation} ${classNameTheme.style}`}
            id="element"
          ></div>

          <div
            className={`${animationState.animation == 'Chat Bubble' ? 'flex' : 'hidden'} text-left w-full justify-center flex-col break-words`}
          >
            <div
              className={`${displayFistBubble ? 'block' : 'hidden'} ${classNameAnimation} ${classNameTheme.style} mb-2 break-words dynamic-width`}
              id={`chat-bubble-${counterChatBubble}`}
            ></div>
            <div
              className={`${displaySecondBubble ? 'block' : 'hidden'} ${classNameAnimation} ${classNameTheme.style} break-words dynamic-width`}
              id={`chat-bubble-${counterChatBubble + 1}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
