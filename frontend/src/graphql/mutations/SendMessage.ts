import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
    mutation SendMessage($message: String!, $chatroomId: Float!) {
        sendMessage(message: $message, chatroomId: $chatroomId) {
            id
            message
            user {
                username
                id
            }
        }
    }
`