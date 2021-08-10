import React from 'react';
import { render } from '@testing-library/react';

import Page from './index';

describe('index page suite', () => {
    it('renders hello world message', () => {
        const { getByText } = render(<Page />);
        const expectedText = 'Hello World!!';

        expect(getByText(expectedText)).toBeInTheDocument();
    });
});
