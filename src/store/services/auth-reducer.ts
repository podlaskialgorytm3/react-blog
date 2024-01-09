import { createSlice } from '@reduxjs/toolkit';

const initialState:{token: string | null} = {
    token: '',
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload;
        },
        logout(state){
            state.token = '';
        }
    }
})

export default authReducer;