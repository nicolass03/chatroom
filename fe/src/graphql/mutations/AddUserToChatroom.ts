import { gql } from "@apollo/client";

export const ADD_USER_TO_CHATROOM = gql `
    mutation AddUserToChatroom($userId: Float!, $chatroomId: Float!) {
        addUserToChatroom(userId: $userId, chatroomId: $chatroomId) {
            id
            name
            createdAt
            updatedAt
            users {
                id
                username
            }
            messages {
                id
                message
                createdAt
                updatedAt
                user {
                    username
                    id
                }
            }
        }
    }`