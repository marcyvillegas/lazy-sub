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
  setDisplaySecondBubble: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayTyping: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { contentState, animationState, updateAnimation } = useAnimationStore();

  const [startSecondBubble, setStartSecondBubble] = useState(false);

  let contentChatBubble = contentState.content;

  useEffect(() => {
    const content = contentState.content;
    let contentNumber = 1;

    // Default and bounce animation
    if (
      animationState.isAnimationStarting &&
      !['Typing', 'Chat Bubble'].includes(animationState.animation)
    ) {
      setDisplayTyping(false);
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
      setDisplayTyping(true);
      const contentTyping = contentState.content;
      const typed = new Typed('#element', {
        strings: contentTyping,
        typeSpeed: 40,
        showCursor: false,
        onComplete: () => {
          setTimeout(() => {
            setDisplayTyping(false);
            updateAnimation({ isAnimationStarting: false });
          }, 1500);
        },
      });

      return () => {
        typed.destroy();
      };
    }

    // Chat bubble animation - first chat bubble
    if (animationState.isAnimationStarting == false) {
      setCounterChatBubble(0);
      setStartSecondBubble(false);
    }

    if (
      animationState.isAnimationStarting &&
      animationState.animation == 'Chat Bubble'
    ) {
      setDisplayFistBubble(true);
      if (counterChatBubble == 0) {
        setDisplaySecondBubble(false);
      }

      let typedChatBubble: Typed;

      if (!startSecondBubble) {
        typedChatBubble = new Typed(`#chat-bubble-${counterChatBubble}`, {
          strings: [contentChatBubble[counterChatBubble]],
          typeSpeed: 40,
          showCursor: false,
          onComplete: () => {
            setStartSecondBubble(true);
            if (!(counterChatBubble < contentChatBubble.length - 1)) {
              setTimeout(() => {
                setDisplayFistBubble(false);
                updateAnimation({ isAnimationStarting: false });
              }, 1000);
            }
          },
        });
      }

      return () => {
        if (typedChatBubble) {
          typedChatBubble.destroy();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setDisplayTyping,
    contentChatBubble,
  ]);

  useEffect(() => {
    // Chat bubble animation - second chat bubble
    if (counterChatBubble < contentChatBubble.length - 1) {
      if (startSecondBubble) {
        setDisplaySecondBubble(true);

        let secondTypedChatBubble: Typed;

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
                setStartSecondBubble(false);

                if (counterChatBubble + 1 == contentChatBubble.length - 1) {
                  updateAnimation({ isAnimationStarting: false });
                }
              }, 1500);

              if (counterChatBubble + 1 < contentChatBubble.length - 1) {
                setTimeout(() => {
                  setCounterChatBubble((prev) => prev + 2);
                }, 1600);
              }
            },
          }
        );

        return () => {
          if (secondTypedChatBubble) {
            secondTypedChatBubble.destroy();
          }
        };
      }
    }
  }, [
    animationState.isAnimationStarting,
    contentChatBubble,
    counterChatBubble,
    setCounterChatBubble,
    setDisplayFistBubble,
    setDisplaySecondBubble,
    startSecondBubble,
    updateAnimation,
  ]);
}
