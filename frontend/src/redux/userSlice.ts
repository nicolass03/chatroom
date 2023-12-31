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
        setUser: (state, action) => {
            const {username, id, email} = action.payload;
            state.username = username;
            state.id = id;
            state.email = email;
        },
        clearUser: (state) => {
            state.username = '';
            state.id = undefined;
            state.email = undefined;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;