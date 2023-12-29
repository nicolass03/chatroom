import {createSlice} from '@reduxjs/toolkit';

interface UserState {
    username: string,
    id: number | undefined,
    email: string | undefined,
}

const initialState: UserState = { 
    username: '',
    id: undefined,
    email: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action) => {
            const {username, id, email} = action.payload;
            state.username = username;
            state.id = id;
            state.email = email;
        },
        login: (state, action) => {
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.username = '';
            state.id = undefined;
            state.email = undefined;
        },
    },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;