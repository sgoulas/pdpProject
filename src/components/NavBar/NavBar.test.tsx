import React from 'react';

import { render } from '@testUtils';

import NavBar from './NavBar';

describe('NavBar', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = render(<NavBar />);

        expect(firstChild).toMatchSnapshot();
    });
});
