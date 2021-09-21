import React from 'react';

import { renderWithProviders } from '@testUtils';

import Main, { MainProps } from './Main';

describe('Main page suite', () => {
    const defaultProps: MainProps = {
        frontPagePhones: { results: [] },
    };

    it('matches snapshot', () => {
        const { container } = renderWithProviders(<Main {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
