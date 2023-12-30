import { gql } from "@apollo/client";

export const GET_CHATROOM_MESSAGES = gql `
    query GetChatroomMessages($chatroomId: Float!) {
        getChatroomMessages(chatroomId: $chatroomId) {
            id
            message
            createdAt
            updatedAt
            user {
                username
                id
            }
            chatroom {
                id
                name
            }
        }
    }
`