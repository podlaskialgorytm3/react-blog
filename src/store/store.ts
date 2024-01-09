import { configureStore } from "@reduxjs/toolkit";

import authReducer from './services/auth-reducer';

const store = configureStore({
    reducer: {
        auth: authReducer.reducer
    }
})

export const authActions = authReducer.actions;
export default store;