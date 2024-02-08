'use client'

import React, { ReactNode, createContext, useContext, useReducer } from "react";

// Add interfaces or types here
interface StateInterface {
    content: string,
    animation: string,
}

interface ActionInterface {
    type: 'SET_CONTENT' | 'SET_ANIMATION';
    payload: StateInterface
}

type DispatchType = (action: ActionInterface) => void

// Define the initial state
const initialState = {
    content: `This is a sample content
    =
    Start writing your content`,
    animation: 'sample animation'
};

// Define the reducer function to handle state transitions
const reducer = (state: StateInterface, action: ActionInterface) => {
    switch (action.type) {
        case 'SET_CONTENT':
            return { ...state, ...action.payload, };
        case 'SET_ANIMATION':
            return { ...state, ...action.payload, };
        default:
            throw new Error();
    }
}

// Create a context to hold the state
const AnimationContext = createContext<
    { state: StateInterface; dispatch: DispatchType } | undefined
>(undefined)

// Create a component that will provide the context
// IncrementProvider takes in an argument called children
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // In this return value, we passed-in children as the CONSUMER of the PROVIDER
    // This will able children components to access the data inside the context
    return (
        <AnimationContext.Provider value={{ state, dispatch }}>
            {children}
        </AnimationContext.Provider>
    );
}

// Create a function that invokes the context 
export const useAnimationProvider = () => {
    const context = useContext(AnimationContext)

    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}