'use client'

import React, { createContext, useContext, useReducer } from "react";

// Add interfaces here

// Define the initial state
const initialState = {
    count: 0
};

// Create a context to hold the state
const IncrementContext = createContext(initialState);

// Define the reducer function to handle state transitions
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };
        case 'decrement':
            return { ...state, count: state.count - 1 };
        default:
            throw new Error();
    }
}

// Create a component that will provide the context
// IncrementProvider takes in an argument called children
export const IncrementProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // In this return value, we passed-in children as the CONSUMER of the PROVIDER
    // This will able children components to access the data inside the context
    return (
        <IncrementContext.Provider value={{ ...state, dispatch }}>
            {children}
        </IncrementContext.Provider>
    );
}

// Create a function that invokes the context 
export const useIncrementContext = () => {
    return useContext(IncrementContext)
}