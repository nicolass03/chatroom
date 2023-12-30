import { gql } from "@apollo/client";

export const CREATE_CHATROOM = gql`
    mutation CreateChatroom($name: String!) {
        createChatroom(input :{name: $name}) {
            id
            name
        }
    }`