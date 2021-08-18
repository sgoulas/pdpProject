import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { client } from '@api';

import store from '@store/store';

interface AllTheProvidersProps {
    children?: ReactNode;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({
    children,
}: AllTheProvidersProps) => (
    <ReduxProvider store={store}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
    </ReduxProvider>
);

const renderWithProviders: (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => RenderResult = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { renderWithProviders };
