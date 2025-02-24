import React, { createContext, useReducer } from 'react';

const initialState = {
    users: [],
    departments: [],
    subjects: [],
    counties: [],
    disciplines: [],
    rooms: [],
};

const AppContext = createContext(initialState);

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_USER':
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case 'SAVE_DEPARTMENT':
            return {
                ...state,
                departments: Array.isArray(action.payload) ? action.payload : [],
            };
        case 'SAVE_SUBJECT':
            return {
                ...state,
                subjects: Array.isArray(action.payload) ? action.payload : [],
            };
        case 'SAVE_COUNTY':
            return {
                ...state,
                counties: Array.isArray(action.payload) ? action.payload : [],
            };
        case 'SAVE_DISCIPLINE':
            return {
                ...state,
                disciplines: Array.isArray(action.payload) ? action.payload : [],
            };
        case 'SAVE_ROOM':
            return {
                ...state,
                rooms: Array.isArray(action.payload) ? action.payload : [],
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;