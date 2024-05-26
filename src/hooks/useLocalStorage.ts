import {
  AnimationStateInterface,
  ContentStateInterface,
} from '@/stores/animationStore';

type LocalStorageReturnType = {
  setContentAnimationState: (
    contentState: ContentStateInterface,
    animationState: AnimationStateInterface
  ) => void;
};

export default function useLocalStorage(): LocalStorageReturnType {
  function setContentAnimationState(
    contentState: ContentStateInterface,
    animationState: AnimationStateInterface
  ) {
    const value = { contentState, animationState };

    animationState.isAnimationStarting = false;

    localStorage.setItem('content-animation-state', JSON.stringify(value));
  }

  return { setContentAnimationState };
}
