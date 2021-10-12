import React from 'react';

import { renderWithProviders } from '@testUtils';

import Jumbotron from './Jumbotron';

describe('Jumbotron', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('navigates to product page', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const useRouter = jest.spyOn(require('next/router'), 'useRouter');
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({ push: mockPush }));

        const { getByText } = renderWithProviders(<Jumbotron />);

        getByText('iPhone 13 Pro').click();

        expect(mockPush).toHaveBeenCalled();
    });
});
