'use client';

import { LegacyRef, RefObject, useEffect, useState } from 'react';
import Typed from 'typed.js';
import { useAnimationStore } from '@/stores/animationStore';

export default function useDisplayAnimation(
  setLineDisplayed: React.Dispatch<React.SetStateAction<string>>,
  selectedAnimation: string,
  selectedFont: string,
  selectedFontSize: number,
  selectedTheme: string,
  contentRef: any | null
) {
  const { contentState, animationState, updateAnimation } = useAnimationStore();

  useEffect(() => {
    const content = contentState.content;
    let contentNumber = 1;

    if (
      animationState.isAnimationStarting &&
      animationState.animation != 'Typing'
    ) {
      if (contentRef != null && contentRef.current.innerText == '') {
        contentRef.current.innerText = content[0];
      }

      setLineDisplayed(content[0]);

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
  ]);
}
