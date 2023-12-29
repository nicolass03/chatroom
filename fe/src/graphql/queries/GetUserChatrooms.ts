import { gql } from "@apollo/client";

export const GET_USER_CHATROOMS = gql `
    query GetUserChatrooms($userId: Float!) {
        getUserChatrooms(userId: $userId) {
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