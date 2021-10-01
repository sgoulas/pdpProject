import React from 'react';

import { render } from '@testUtils';

import Layout from './Layout';

describe('Layout', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = render(<Layout>mockChildren</Layout>);

        expect(firstChild).toMatchSnapshot();
    });
});
