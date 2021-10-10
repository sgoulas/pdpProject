import React from 'react';

import { renderWithProviders } from '@testUtils';

import Layout from './Layout';

describe('Layout', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<Layout>mockChildren</Layout>);

        expect(firstChild).toMatchSnapshot();
    });
});
