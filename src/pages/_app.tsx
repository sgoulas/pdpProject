import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '@store/store';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
);

export default App;
