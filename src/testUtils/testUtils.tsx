/* eslint-disable react/display-name */
import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, RootState, makeStore } from '@store/store';
import { theme } from '@styles';

export type GQLmocks = MockedProviderProps['mocks'];

export const withApolloMocks =
    (mocks: GQLmocks) =>
    (Component: ReactElement): JSX.Element =>
        (
            <MockedProvider mocks={mocks} addTypename={false}>
                {Component}
            </MockedProvider>
        );

interface AllTheProvidersProps {
    children?: ReactNode;
    initialState?: RootState;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({
    children,
    initialState,
}: AllTheProvidersProps) => (
    <ReduxProvider store={makeStore(initialState)}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </PersistGate>
    </ReduxProvider>
);

type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
    initialState?: RootState;
};

const renderWithProviders: (
    ui: ReactElement,
    options?: RenderWithProvidersOptions
) => RenderResult = (ui, options) =>
    render(ui, {
        wrapper: props => (
            <AllTheProviders initialState={options?.initialState} {...props} />
        ),
        ...options,
    });

export * from '@testing-library/react';
export { renderWithProviders };
