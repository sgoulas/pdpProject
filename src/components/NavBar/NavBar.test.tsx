import React from 'react';

import { renderWithProviders } from '@testUtils';

import NavBar from './NavBar';

describe('NavBar', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({ pathname: 'some-page' }));
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<NavBar />);

        expect(firstChild).toMatchSnapshot();
    });
});
