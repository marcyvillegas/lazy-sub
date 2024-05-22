'use client';

import { useEffect } from 'react';
import Typed from 'typed.js';
import { useAnimationStore } from '@/stores/animationStore';

export default function useDisplayAnimation(
  setLineDisplayed: React.Dispatch<React.SetStateAction<string>>,
  selectedAnimation: string,
  selectedFont: string,
  selectedFontSize: number
) {
  const { contentState, animationState, updateAnimation } = useAnimationStore();

  useEffect(() => {
    const content = contentState.content;
    let contentNumber = 1;

    if (
      animationState.isAnimationStarting &&
      animationState.animation != 'Typing'
    ) {
      setLineDisplayed(content[0]);

      const interval = setInterval(() => {
        setLineDisplayed(content[contentNumber]);
        contentNumber += 1;

        if (contentNumber > content.length) {
          contentNumber = 0;

          updateAnimation({
            animation: animationState.animation,
            theme: animationState.theme,
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
      const typed = new Typed('#element', {
        strings: contentState.content,
        typeSpeed: 50,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [
    animationState.isAnimationStarting,
    contentState.content,
    animationState.animation,
    setLineDisplayed,
    selectedAnimation,
    selectedFont,
    selectedFontSize,
    animationState.theme,
    updateAnimation,
  ]);
}
