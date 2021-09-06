import React from 'react';

import { renderWithProviders } from '@testUtils';

import Footer from './Footer';

describe('Footer component', () => {
    it('matches snapshot', () => {
        const { container } = renderWithProviders(<Footer />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
