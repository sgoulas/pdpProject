import React from 'react';
import faker from 'faker';

import { renderWithProviders, fireEvent, waitFor } from '@testUtils';

import BillingInformationForm from './BillingInformationForm';

describe('BillingInformationForm', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<BillingInformationForm />);

        expect(firstChild).toMatchSnapshot();
    });

    it('updates billing full name', () => {
        const { getByRole } = renderWithProviders(<BillingInformationForm />);
        const fullNameInput = getByRole('textbox', {
            name: /full name/i,
        });

        const rndFullName = `${faker.name.firstName()} ${faker.name.lastName()}`;

        fireEvent.change(fullNameInput, { target: { value: rndFullName } });

        expect(fullNameInput).toHaveAttribute('value', rndFullName);
    });
    it('shows error text for invalid full name input', async () => {
        const { getByRole, getByText } = renderWithProviders(
            <BillingInformationForm />
        );
        const fullNameInput = getByRole('textbox', {
            name: /full name/i,
        });

        fullNameInput.focus();

        fullNameInput.blur();

        await waitFor(() =>
            expect(
                getByText('field should contain a valid full name')
            ).toBeVisible()
        );
    });

    it('updates billing address', () => {
        const { getByRole } = renderWithProviders(<BillingInformationForm />);
        const addressInput = getByRole('textbox', { name: /address/i });

        const rndAddress = faker.address.streetName();

        fireEvent.change(addressInput, { target: { value: rndAddress } });

        expect(addressInput).toHaveAttribute('value', rndAddress);
    });
    it('shows error text for invalid full name input', async () => {
        const { getByRole, getByText } = renderWithProviders(
            <BillingInformationForm />
        );
        const addressInput = getByRole('textbox', { name: /address/i });

        addressInput.focus();

        addressInput.blur();

        await waitFor(() =>
            expect(
                getByText('field should contain a valid address')
            ).toBeVisible()
        );
    });
});
