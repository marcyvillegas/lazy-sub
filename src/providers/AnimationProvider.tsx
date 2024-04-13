'use client'

import React, { ReactNode, createContext, useContext, useReducer } from "react";

import { animationTypes } from "@/modules/animation/contants/animationTypes";
import { themes } from "@/modules/animation/contants/themes";
import { ContentPayloadInterface } from "@/modules/animation/interfaces/ContentPayloadInteface";

// Add interfaces or types here
interface StateInterface {
    contentState: {
        content: string[]
        separator: string
    }
    animationState: {
        animation: string
        isAnimationStarting: boolean
        theme: string
    }
}

interface ActionInterface {
    type: 'SET_CONTENT' | 'SET_ANIMATION';
    payload: any
}

// Define the initial state
const initialState = {
    contentState: {
        content: ['This is a sample content', `The "=" are separators of the content`, 'Start typing what you want!', 'Start to animate using LazySub!'],
        separator: '='
    },
    animationState: {
        animation: animationTypes[0].name,
        isAnimationStarting: false,
        theme: themes[0].name
    }
};

// Define the reducer function to handle state transitions
const reducer = (state: StateInterface, action: ActionInterface) => {
    switch (action.type) {
        case 'SET_CONTENT':
            return {
                ...state,
                ...action.payload,
            };

        case 'SET_ANIMATION':
            return {
                ...state,
                ...action.payload,
            };

        default:
            throw new Error();
    }
}

// Create a context to hold the state
const AnimationContext = createContext<
    {
        state: StateInterface;
        dispatch: (action: ActionInterface) => void;
        onSubmitContent: (values: ContentPayloadInterface) => void
    } | undefined
>(undefined)

// Create a component that will provide the context
// AnimationProvider takes in an argument called children
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmitContent = (values: ContentPayloadInterface) => {
        dispatch({ type: 'SET_CONTENT', payload: values })
    }

    // In this return value, we passed-in children as the CONSUMER of the PROVIDER
    // This will able children components to access the data inside the context
    return (
        <AnimationContext.Provider value={{
            state,
            dispatch,
            onSubmitContent
        }}>
            {children}
        </AnimationContext.Provider>
    );
}

// Create a function that invokes the context 
export const useAnimationProvider = () => {
    const context = useContext(AnimationContext)

    if (context === undefined) {
        throw new Error('useAnimationProvider must be used within a AnimationProvider')
    }
    return context
}