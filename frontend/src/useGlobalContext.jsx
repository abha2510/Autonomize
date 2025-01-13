import React, { useReducer, createContext, useContext } from 'react';


const initialState = {
  userData: null,
  repos: [],
  followers: [],
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'SET_REPOS':
      return { ...state, repos: action.payload };
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
      case 'SET_USER_DATA':
        return {
          ...state,
          userData: { ...state.userData, ...action.payload },
        };
      
      
    default:
      return state;
  }
};

const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => useContext(GlobalContext);
