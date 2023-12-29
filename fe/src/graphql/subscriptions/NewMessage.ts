import { gql } from "@apollo/client";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription NewMessage($chatroomId: Float!) {
        newMessage(chatroomId: $chatroomId) {
            id
            message
            user {
                username
                id
            }
        }
    }
`