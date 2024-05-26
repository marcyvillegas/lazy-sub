import { create } from 'zustand';

import {
  animationTypes,
  fontSizes,
  fonts,
  themes,
} from '@/modules/animation/constants';

// interface for content
export interface ContentStateInterface {
  content: string[];
  separator: string;
  startEditing: boolean;
}

// interface for animation
export interface AnimationStateInterface {
  animation: string;
  isAnimationStarting: boolean;
  theme: string;
  font: string;
  fontSize: number;
  startEditing: boolean;
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
  startEditing: false,
};

const initialAnimationState: AnimationStateInterface = {
  animation: animationTypes[0].name,
  isAnimationStarting: false,
  theme: themes[0].name,
  font: fonts[0].name,
  fontSize: fontSizes[0].name,
  startEditing: false,
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
