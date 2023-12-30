import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($email: String!, $password: String!, $username: String!, $confirmPassword: String!) {
        register(input: { email: $email, password: $password, username: $username, confirmPassword: $confirmPassword }) {
        user {
            id
            email
            username
        }
    }
    }
`