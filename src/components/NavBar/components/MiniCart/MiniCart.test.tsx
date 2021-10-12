import React from 'react';

import { renderWithProviders } from '@testUtils';

import MiniCart from './MiniCart';

describe('MiniCart', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<MiniCart />);

        expect(firstChild).toMatchSnapshot();
    });
});
