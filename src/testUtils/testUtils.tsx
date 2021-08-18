import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProviderProps } from '@apollo/client/testing';

import store from '@store/store';

export type GQLmocks = MockedProviderProps['mocks'];

interface AllTheProvidersProps {
    children?: ReactNode;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({
    children,
}: AllTheProvidersProps) => (
    <ReduxProvider store={store}>{children}</ReduxProvider>
);

const renderWithProviders: (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => RenderResult = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { renderWithProviders };
