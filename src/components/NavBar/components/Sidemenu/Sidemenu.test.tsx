import React from 'react';

import { renderWithProviders, fireEvent, waitFor } from '@testUtils';

import Sidemenu from './Sidemenu';

describe('Sidemenu component', () => {
    it('matches snapshot', () => {
        const { container } = renderWithProviders(<Sidemenu />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('initially is hidden', () => {
        const { queryByText } = renderWithProviders(<Sidemenu />);
        const expectedText = 'Hello, Sign in';

        expect(queryByText(expectedText)).toBe(null);
    });

    it('opens the sidedrawer', async () => {
        const { queryByText, getByTestId } = renderWithProviders(<Sidemenu />);

        expect(queryByText('Hello, Sign in')).toBe(null);

        fireEvent.click(getByTestId('toggle-sidemenu-button'));

        await waitFor(() =>
            expect(queryByText('Hello, Sign in')).toBeVisible()
        );
    });

    it('closes the sidedrawer', async () => {
        const { queryByText, getByTestId, getByText } = renderWithProviders(
            <Sidemenu />
        );

        const toggleMenuBtn = getByTestId('toggle-sidemenu-button');

        toggleMenuBtn.click();

        await waitFor(() =>
            expect(queryByText('Hello, Sign in')).toBeVisible()
        );

        getByText('Hello, Sign in').click();

        await waitFor(() => expect(queryByText('Hello, Sign in')).toBe(null));
    });
});
