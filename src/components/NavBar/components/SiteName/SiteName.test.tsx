import React from 'react';

import { render } from '@testUtils';

import SiteName from './SiteName';

describe('SiteName', () => {
    it('matches snapshot', () => {
        const { container } = render(<SiteName />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
