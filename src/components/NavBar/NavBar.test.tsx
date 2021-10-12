import React from 'react';

import { renderWithProviders } from '@testUtils';

import NavBar from './NavBar';

describe('NavBar', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<NavBar />);

        expect(firstChild).toMatchSnapshot();
    });
});
