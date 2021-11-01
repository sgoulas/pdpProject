import { InMemoryCacheConfig, DefaultOptions } from '@apollo/client';

export const BACK_END_URL = 'http://localhost:4000/graphql';

export const CACHE_OPTIONS: InMemoryCacheConfig = {
    addTypename: false,
};

export const CLIENT_OPTIONS = {
    name: 'PDP client',
    version: '1.0.0',
};

export const CLIENT_DEFAULT_OPTIONS: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-and-network',
        refetchWritePolicy: 'overwrite',
        errorPolicy: 'all',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
    mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};
