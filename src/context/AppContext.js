import React, { createContext, useReducer } from 'react';

const initialState = {
    users: [],
    departments: [],
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
                departments: [...state.departments, action.payload],
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