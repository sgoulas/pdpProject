import React from 'react';
import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';

import { theme } from '@styles';
import { Layout } from '@components';
import { client } from '@api';
import store, { persistor } from '@store/store';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
    <>
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeProvider>
                </ApolloProvider>
            </PersistGate>
        </ReduxProvider>
    </>
);

export default App;
