import React from 'react';

import { renderWithProviders } from '@testUtils';

import CardPaymentForm from './CardPaymentForm';

describe('CardPaymentForm', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<CardPaymentForm />);

        expect(firstChild).toMatchSnapshot();
    });
    // it('', () => {});
    // it('', () => {});

    // it('', () => {});
    // it('', () => {});
    // it('', () => {});
});
