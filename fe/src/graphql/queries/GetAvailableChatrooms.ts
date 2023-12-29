import { gql } from "@apollo/client";

export const GET_AVAILABLE_CHATROOMS = gql `
    query GetAvailableChatrooms($userId: Float!) {
        getAvailableChatrooms(userId: $userId) {
            id
            name
        }
    }
`