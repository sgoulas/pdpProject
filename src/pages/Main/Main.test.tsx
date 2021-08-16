import React from 'react';
import { renderWithProviders } from '@testUtils';

import Main from './Main';

describe('Main page suite', () => {
    it('renders hello world message', () => {
        const { getByText } = renderWithProviders(<Main />);
        const expectedText = 'Hello World!!';

        expect(getByText(expectedText)).toBeInTheDocument();
    });
});
