import React from 'react';

import { renderWithProviders } from '@testUtils';

import SiteName from './SiteName';
import { landingPage, SITE_NAME } from '@core';

describe('SiteName', () => {
    it('matches snapshot', () => {
        const { container } = renderWithProviders(<SiteName />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('navigates to landing page', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const useRouter = jest.spyOn(require('next/router'), 'useRouter');
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({ push: mockPush }));

        const { getByText } = renderWithProviders(<SiteName />);

        const siteName = getByText(SITE_NAME);

        siteName.click();

        expect(mockPush).toHaveBeenLastCalledWith(landingPage());
    });
});
