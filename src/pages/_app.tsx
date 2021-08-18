import React from 'react';
import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { client } from '@api';
import store from '@store/store';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
    <ReduxProvider store={store}>
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    </ReduxProvider>
);

export default App;
