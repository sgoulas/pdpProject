import React from 'react';

import { render } from '@testUtils';

import LocalBusinessJSONLD from './LocalBusinessJSONLD';

describe('LocalBusinessJSONLD', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = render(<LocalBusinessJSONLD />);

        expect(firstChild).toMatchSnapshot();
    });
});
