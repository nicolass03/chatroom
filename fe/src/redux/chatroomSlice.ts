import {createSlice} from '@reduxjs/toolkit';

interface ChatroomState {
    activeChatroomId: number | undefined
}

const initialState: ChatroomState = { 
    activeChatroomId: undefined,
}

export const chatroomSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveChatroom: (state, action) => {
            state.activeChatroomId = action.payload;
        },
        clearChatroom: (state) => {
            state.activeChatroomId = undefined;
        }
    },
});

export const { setActiveChatroom, clearChatroom } = chatroomSlice.actions;
export default chatroomSlice.reducer;