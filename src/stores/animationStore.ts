import { create } from 'zustand';

import {
  animationTypes,
  fontSizes,
  fonts,
  themes,
} from '@/modules/animation/constants';

// interface for content
interface ContentStateInterface {
  content: string[];
  separator: string;
}

// interface for animation
interface AnimationStateInterface {
  animation: string;
  isAnimationStarting: boolean;
  theme: string;
  font: string;
  fontSize: number;
}

type AnimationStore = {
  contentState: ContentStateInterface;
  animationState: AnimationStateInterface;
  updateContent: (content: {}) => void;
  updateAnimation: (animation: {}) => void;
};

const initialContentState: ContentStateInterface = {
  content: [
    'This is a sample content',
    `The "=" are separators of the content`,
    'Start typing what you want!',
    'Start to animate using LazySub!',
  ],
  separator: '=',
};

const initialAnimationState: AnimationStateInterface = {
  animation: animationTypes[0].name,
  isAnimationStarting: false,
  theme: themes[0].name,
  font: fonts[0].name,
  fontSize: fontSizes[0].name,
};

export const useAnimationStore = create<AnimationStore>((set) => ({
  contentState: initialContentState,
  animationState: initialAnimationState,
  updateContent: (content) => {
    set((state) => ({ contentState: { ...state.contentState, ...content } }));
  },
  updateAnimation: (animation) => {
    set((state) => ({
      animationState: { ...state.animationState, ...animation },
    }));
  },
}));
