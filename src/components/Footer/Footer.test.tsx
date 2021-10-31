import React from 'react';

import { renderWithProviders } from '@testUtils';

import Footer from './Footer';

describe('Footer component', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));
    it('matches snapshot', () => {
        const { container } = renderWithProviders(<Footer />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('navigates to about page', () => {
        const { getByText } = renderWithProviders(<Footer />);

        const faqPageLink = getByText('about this project');

        faqPageLink.click();

        expect(mockPush).toHaveBeenCalled();
    });
});
