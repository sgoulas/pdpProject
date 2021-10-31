import React from 'react';

import { renderWithProviders } from '@testUtils';

import Layout from './Layout';

describe('Layout', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({ pathname: 'some-page' }));
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<Layout>mockChildren</Layout>);

        expect(firstChild).toMatchSnapshot();
    });
});
