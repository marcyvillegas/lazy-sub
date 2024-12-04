'use client'

import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import { useAnimationStore } from '@/stores/animationStore'

export default function useDisplayAnimation(
  setLineDisplayed: React.Dispatch<React.SetStateAction<string>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentRef: any | null,
  counterChatBubble: number,
  setCounterChatBubble: React.Dispatch<React.SetStateAction<number>>,
  setDisplayFistBubble: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplaySecondBubble: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayTyping: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { contentState, animationState, updateAnimation } = useAnimationStore()

  const [startSecondBubble, setStartSecondBubble] = useState(false)
  const timeOneRef = useRef<null | NodeJS.Timeout>(null)
  const timeTwoRef = useRef<null | NodeJS.Timeout>(null)

  const timeThreeRef = useRef<null | NodeJS.Timeout>(null)
  const timeFourRef = useRef<null | NodeJS.Timeout>(null)
  const timeFiveRef = useRef<null | NodeJS.Timeout>(null)

  // Chat Bubble settings
  const TYPE_SPEED = 40

  useEffect(() => {
    const content = contentState.content
    let contentNumber = 1

    // 👉 Default and bounce animation
    if (
      animationState.isAnimationStarting &&
      !['Typing', 'Chat Bubble'].includes(animationState.animation)
    ) {
      setDisplayTyping(false)
      setLineDisplayed(content[0])

      if (contentRef != null && contentRef?.current?.innerText == '') {
        contentRef.current.innerText = content[0]
      }

      const interval = setInterval(() => {
        setLineDisplayed(content[contentNumber])
        contentNumber += 1

        if (contentNumber > content.length) {
          contentNumber = 0

          updateAnimation({
            isAnimationStarting: false,
          })
        }
      }, 4000)

      return () => clearInterval(interval)
    }

    // 👉 Typing animation
    if (
      animationState.isAnimationStarting &&
      animationState.animation == 'Typing'
    ) {
      setDisplayTyping(true)
      const contentTyping = contentState.content
      const typed = new Typed('#element', {
        strings: contentTyping,
        typeSpeed: 40,
        showCursor: false,
        onComplete: () => {
          setTimeout(() => {
            setDisplayTyping(false)
            updateAnimation({ isAnimationStarting: false })
          }, 1500)
        },
      })

      return () => {
        typed.destroy()
      }
    }

    // 👉 Chat bubble animation - first chat bubble
    if (!animationState.isAnimationStarting) {
      setCounterChatBubble(0)
      setStartSecondBubble(false)
      if (timeOneRef.current) clearTimeout(timeOneRef.current) // Clear the timeout
      timeOneRef.current = null
      if (timeTwoRef.current) clearTimeout(timeTwoRef.current) // Clear the timeout
      timeTwoRef.current = null
    }

    if (
      animationState.isAnimationStarting &&
      animationState.animation == 'Chat Bubble'
    ) {
      setDisplayFistBubble(true)
      if (counterChatBubble == 0) {
        setDisplaySecondBubble(false)
      }

      let typedChatBubble: Typed

      if (!startSecondBubble) {
        typedChatBubble = new Typed(`#chat-bubble-${counterChatBubble}`, {
          strings: [contentState.content[counterChatBubble]],
          typeSpeed: TYPE_SPEED,
          showCursor: false,
          onComplete: () => {
            // Displays the second chat bubble
            timeOneRef.current = setTimeout(() => {
              setStartSecondBubble(true)
            }, 1500)

            // Runs if there is only one chat bubble
            if (!(counterChatBubble < contentState.content.length - 1)) {
              timeTwoRef.current = setTimeout(() => {
                setDisplayFistBubble(false)
                updateAnimation({
                  isAnimationStarting: false,
                })
              }, 1500)
            }
          },
        })
      }

      return () => {
        if (typedChatBubble) {
          typedChatBubble.destroy()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    animationState.isAnimationStarting,
    contentState.content,
    animationState.animation,
    animationState.theme,
    setLineDisplayed,
    updateAnimation,
    contentRef,
    counterChatBubble,
    setCounterChatBubble,
    setDisplayFistBubble,
    setDisplaySecondBubble,
    setDisplayTyping,
  ])

  useEffect(() => {
    // 👉 Chat bubble animation - second chat bubble
    if (!animationState.isAnimationStarting) {
      if (timeThreeRef.current) clearTimeout(timeThreeRef.current) // Clear the timeout
      timeThreeRef.current = null
      if (timeFourRef.current) clearTimeout(timeFourRef.current) // Clear the timeout
      timeFourRef.current = null
      if (timeFiveRef.current) clearTimeout(timeFiveRef.current) // Clear the timeout
      timeFiveRef.current = null
    }

    if (
      counterChatBubble < contentState.content.length - 1 &&
      animationState.isAnimationStarting
    ) {
      if (startSecondBubble) {
        setDisplaySecondBubble(true)

        let secondTypedChatBubble: Typed

        // eslint-disable-next-line prefer-const
        secondTypedChatBubble = new Typed(
          `#chat-bubble-${counterChatBubble + 1}`,
          {
            strings: [contentState.content[counterChatBubble + 1]],
            typeSpeed: TYPE_SPEED,
            showCursor: false,
            onComplete: () => {
              // Removes the first chat bubble
              timeThreeRef.current = setTimeout(() => {
                setDisplayFistBubble(false)
              }, 1500)

              timeFourRef.current = setTimeout(() => {
                // Removes the second chat bubble
                setDisplaySecondBubble(false)
                setStartSecondBubble(false)

                // Stops the animation if its the last set of text
                if (counterChatBubble + 1 == contentState.content.length - 1) {
                  updateAnimation({
                    isAnimationStarting: false,
                  })
                }
              }, 2000)

              // Moves to the next set of text to animate
              if (counterChatBubble + 1 < contentState.content.length - 1) {
                timeFiveRef.current = setTimeout(() => {
                  setCounterChatBubble((prev) => prev + 2)
                }, 2100)
              }
            },
          }
        )

        return () => {
          if (secondTypedChatBubble) {
            secondTypedChatBubble.destroy()
          }
        }
      }
    }
  }, [
    animationState.isAnimationStarting,
    contentState.content,
    counterChatBubble,
    setCounterChatBubble,
    setDisplayFistBubble,
    setDisplaySecondBubble,
    startSecondBubble,
    updateAnimation,
  ])
}
