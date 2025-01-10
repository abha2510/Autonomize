import React, { useReducer, createContext, useContext } from 'react';

// Initial State
const initialState = {
  userData: null,
  repos: [],
  followers: [],
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'SET_REPOS':
      return { ...state, repos: action.payload };
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    default:
      return state;
  }
};

// Context
const GlobalContext = createContext();

// Global Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => useContext(GlobalContext);
