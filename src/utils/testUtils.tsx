import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '@store/store';

interface AllTheProvidersProps {
    children?: ReactNode;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({
    children,
}: AllTheProvidersProps) => <Provider store={store}>{children}</Provider>;

const renderWithProviders: (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => RenderResult = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { renderWithProviders };
