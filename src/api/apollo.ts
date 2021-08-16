import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import {
    BACK_END_URL,
    CACHE_OPTIONS,
    CLIENT_OPTIONS,
    CLIENT_DEFAULT_OPTIONS,
} from './constants';
import type { ClientAction } from './types';

const httpLink = new HttpLink({
    uri: BACK_END_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
    name: CLIENT_OPTIONS.name,
    version: CLIENT_OPTIONS.version,
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(CACHE_OPTIONS),
    defaultOptions: CLIENT_DEFAULT_OPTIONS,
});

export const query: ClientAction = (gql, variables) =>
    client
        .query({
            query: gql,
            variables,
        })
        .then(response => ({ data: response.data, errors: response.errors }));

export const mutate: ClientAction = (gql, variables) =>
    client
        .mutate({
            mutation: gql,
            variables,
        })
        .then(response => ({
            data: response.data,
            errors: response.errors,
        }));
