import React from 'react';
import { renderWithProviders } from '@testUtils/testUtils';

import Page from './index';

describe('index page suite', () => {
    it('renders hello world message', () => {
        const { getByText } = renderWithProviders(<Page />);
        const expectedText = 'Hello World!!';

        expect(getByText(expectedText)).toBeInTheDocument();
    });
});
