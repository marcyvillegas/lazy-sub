'use client';

import { useEffect } from 'react';
import Typed from 'typed.js';
import { useAnimationProvider } from '@/providers/AnimationProvider';

export default function useDisplayAnimation(
  setLineDisplayed: React.Dispatch<React.SetStateAction<string>>,
  selectedAnimation: string
) {
  const { state, dispatch } = useAnimationProvider();

  useEffect(() => {
    const content = state.contentState.content;
    let contentNumber = 1;

    if (
      state.animationState.isAnimationStarting &&
      state.animationState.animation != 'Typing'
    ) {
      setLineDisplayed(content[0]);

      const interval = setInterval(() => {
        setLineDisplayed(content[contentNumber]);
        contentNumber += 1;

        if (contentNumber > content.length) {
          contentNumber = 0;
          dispatch({
            type: 'SET_ANIMATION',
            payload: {
              animationState: {
                animation: state.animationState.animation,
                theme: state.animationState.theme,
                isAnimationStarting: false,
              },
            },
          });
        }
      }, 4000);

      return () => clearInterval(interval);
    }

    if (
      state.animationState.isAnimationStarting &&
      state.animationState.animation == 'Typing'
    ) {
      const typed = new Typed('#element', {
        strings: state.contentState.content,
        typeSpeed: 30,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [
    state.animationState.isAnimationStarting,
    state.contentState.content,
    state.animationState.animation,
    setLineDisplayed,
    selectedAnimation,
    state.animationState.theme,
    dispatch,
  ]);
}
