'use client';

import { useEffect, useState } from 'react';
import Typed from 'typed.js';
import { useAnimationStore } from '@/stores/animationStore';

export default function useDisplayAnimation(
  setLineDisplayed: React.Dispatch<React.SetStateAction<string>>,
  selectedAnimation: string,
  selectedFont: string,
  selectedFontSize: number,
  selectedTheme: string,
  contentRef: any | null,
  counterChatBubble: number,
  setCounterChatBubble: React.Dispatch<React.SetStateAction<number>>,
  setDisplayFistBubble: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplaySecondBubble: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { contentState, animationState, updateAnimation } = useAnimationStore();

  useEffect(() => {
    const content = contentState.content;
    let contentNumber = 1;

    // Default and bounce animation
    if (
      animationState.isAnimationStarting &&
      !['Typing', 'Chat Bubble'].includes(animationState.animation)
    ) {
      console.log('SAMPLE');
      setLineDisplayed(content[0]);

      if (contentRef != null && contentRef?.current?.innerText == '') {
        contentRef.current.innerText = content[0];
      }

      const interval = setInterval(() => {
        setLineDisplayed(content[contentNumber]);
        contentNumber += 1;

        if (contentNumber > content.length) {
          contentNumber = 0;

          updateAnimation({
            isAnimationStarting: false,
          });
        }
      }, 4000);

      return () => clearInterval(interval);
    }

    // Typing animation
    if (
      animationState.isAnimationStarting &&
      animationState.animation == 'Typing'
    ) {
      const contentTyping = contentState.content;
      const typed = new Typed('#element', {
        strings: contentTyping,
        typeSpeed: 40,
        showCursor: false,
      });

      return () => {
        typed.destroy();
      };
    }

    // Chat bubble animation
    if (
      animationState.isAnimationStarting == false ||
      selectedFontSize ||
      selectedTheme
    ) {
      setCounterChatBubble(0);
    }

    if (
      animationState.isAnimationStarting &&
      animationState.animation == 'Chat Bubble'
    ) {
      const contentChatBubble = contentState.content;
      setDisplayFistBubble(true);
      if (counterChatBubble == 0) {
        setDisplaySecondBubble(false);
      }

      let typedChatBubble: Typed;
      let secondTypedChatBubble: Typed;

      typedChatBubble = new Typed(`#chat-bubble-${counterChatBubble}`, {
        strings: [contentChatBubble[counterChatBubble]],
        typeSpeed: 40,
        showCursor: false,
      });

      const timeoutChatBubble = setTimeout(() => {
        setDisplaySecondBubble(true);

        secondTypedChatBubble = new Typed(
          `#chat-bubble-${counterChatBubble + 1}`,
          {
            strings: [contentChatBubble[counterChatBubble + 1]],
            typeSpeed: 40,
            showCursor: false,
            onComplete: () => {
              setTimeout(() => {
                setDisplayFistBubble(false);
              }, 1000);

              setTimeout(() => {
                setDisplaySecondBubble(false);
              }, 1500);

              if (counterChatBubble + 1 < contentChatBubble.length - 1) {
                setTimeout(() => {
                  setCounterChatBubble((prev) => prev + 2);
                }, 1600);
              }
            },
          }
        );
      }, 3000);

      return () => {
        if (secondTypedChatBubble) {
          secondTypedChatBubble.destroy();
        }

        if (typedChatBubble) {
          typedChatBubble.destroy();
        }

        clearTimeout(timeoutChatBubble);
      };
    }
  }, [
    animationState.isAnimationStarting,
    contentState.content,
    animationState.animation,
    animationState.theme,
    selectedAnimation,
    selectedFont,
    selectedFontSize,
    selectedTheme,
    setLineDisplayed,
    updateAnimation,
    contentRef,
    counterChatBubble,
    setCounterChatBubble,
    setDisplayFistBubble,
    setDisplaySecondBubble,
  ]);
}
