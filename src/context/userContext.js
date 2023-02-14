import React, { createContext, useReducer } from "react";
export const userContext = createContext();

const initialState = JSON.parse(localStorage.getItem("user")) || {
  userAuth: false,
  userType: null,
  userInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      const data = {
        userAuth: true,
        userType: action.payload.type,
        userInfo: action.payload,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    case "UPDATE":
      const newData = {
        ...state,
        userInfo:{
          ...state.userInfo,
          ...action.payload
        }
      };
      localStorage.setItem("user", JSON.stringify(newData));
      return newData;

    case "LOGOUT":
      localStorage.clear();
      return {
        userAuth: false,
        userType: null,
        userInfo: null,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={[state, dispatch]}>
      {children}
    </userContext.Provider>
  );
};

