import React from 'react';

import { renderWithProviders, fireEvent } from '@testUtils';

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

    it('opens the sidedrawer on toggle action', () => {
        const { queryByText, getByTestId } = renderWithProviders(<Sidemenu />);

        fireEvent.click(getByTestId('toggle-sidemenu-button'));

        expect(queryByText('Hello, Sign in')).toBeVisible();
    });
});
