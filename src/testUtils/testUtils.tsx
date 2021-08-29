/* eslint-disable react/display-name */
import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core/styles';

import store from '@store/store';
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
}

const AllTheProviders: FC<AllTheProvidersProps> = ({
    children,
}: AllTheProvidersProps) => (
    <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReduxProvider>
);

const renderWithProviders: (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => RenderResult = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { renderWithProviders };
