import { gql } from "@apollo/client";

export const NEW_CHATROOM_SUBSCRIPTION = gql`
    subscription NewChatroom {
        newChatroom {
            id
            name
        }
    }
`