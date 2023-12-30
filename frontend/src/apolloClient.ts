import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    gql,
    ApolloLink,
    split,
    Observable,
    HttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

import { logout } from './redux/userSlice';
import { store } from './redux/store';
import { Constants } from './utils/constants';
import { REFRESH_TOKEN } from './graphql/mutations/RefreshToken';

loadErrorMessages()
loadDevMessages()

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
    try {
        const { data } = await client.mutate({ mutation: REFRESH_TOKEN });

        const token = data?.refreshToken;
        if (!token) {
            throw new Error(Constants.REFRESH_TOKEN_ERROR);
        }
        return `Bearer ${token}`;
    } catch (error) {
        throw new Error(Constants.REFRESH_TOKEN_ERROR);
    }
}

let retry = 0;

console.log(import.meta.env.VITE_GRAPHQL_WEBSOCKET_URL);


const wsLink = new WebSocketLink({
    uri: import.meta.env.VITE_GRAPHQL_WEBSOCKET_URL!,
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    },
});

const errorLink = onError(({ graphQLErrors, operation, forward, networkError }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors!) {
            if (err.extensions?.code === Constants.UNAUTHENTICATED) {
                if (retry < Constants.MAX_RETRY) {
                    retry++
                    const oldHeaders = operation.getContext().headers;
                    return new Observable(observer => {
                        refreshToken(apolloClient).then(token => {
                            retry = 0;
                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    Authorization: token
                                }
                            });
                            const forward$ = forward(operation);
                            forward$.subscribe(observer);
                        }).catch(error => {
                            observer.error(error);
                        });
                    });
                } else {
                    store.dispatch(logout());
                }
            }
            if (err.message === Constants.REFRESH_TOKEN_ERROR) {
                store.dispatch(logout());
            }
        }
    }
    if (networkError) {
        console.log(`networkError: ${networkError}`);
    }
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        );
    },
    wsLink,
    ApolloLink.from([errorLink])
)

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache({}),
    link: ApolloLink.from([link, new HttpLink({
        uri: import.meta.env.VITE_GRAPHQL_URL, credentials: 'include', headers: {
            'Content-Type': 'application/json'
        },
    })])
})