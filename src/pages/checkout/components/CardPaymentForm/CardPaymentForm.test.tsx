import React from 'react';
import faker from 'faker';

import { renderWithProviders, fireEvent, waitFor } from '@testUtils';

import CardPaymentForm from './CardPaymentForm';

describe('CardPaymentForm', () => {
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<CardPaymentForm />);

        expect(firstChild).toMatchSnapshot();
    });
    it('updates card number', () => {
        const { getByRole } = renderWithProviders(<CardPaymentForm />);

        const cardNumberInput = getByRole('textbox', {
            name: /card number/i,
        });

        const input = '1234123412341234';

        fireEvent.change(cardNumberInput, {
            target: { value: input },
        });

        expect(cardNumberInput).toHaveAttribute('value', input);
    });
    it('updates card name', () => {
        const { getByRole } = renderWithProviders(<CardPaymentForm />);

        const cardNameInput = getByRole('textbox', {
            name: /card name/i,
        });

        const input = `${faker.name.firstName()} ${faker.name.lastName()}`;

        fireEvent.change(cardNameInput, {
            target: { value: input },
        });

        expect(cardNameInput).toHaveAttribute('value', input);
    });

    it('updates card expiry', () => {
        const { getByRole } = renderWithProviders(<CardPaymentForm />);

        const cardExpiryInput = getByRole('textbox', { name: /expiry/i });

        const input = '1299';

        fireEvent.change(cardExpiryInput, {
            target: { value: input },
        });

        expect(cardExpiryInput).toHaveAttribute('value', input);
    });
    it('updates card cvc', () => {
        const { getByTestId } = renderWithProviders(<CardPaymentForm />);

        const cvcInput = getByTestId('cvc');

        const input = '123';

        fireEvent.change(cvcInput, {
            target: { value: input },
        });

        expect(cvcInput).toHaveAttribute('value', input);
    });

    it('displays card number error', async () => {
        const { getByRole, getByText } = renderWithProviders(
            <CardPaymentForm />
        );

        const cardNumberInput = getByRole('textbox', {
            name: /card number/i,
        });

        cardNumberInput.focus();

        cardNumberInput.blur();

        await waitFor(() =>
            expect(getByText('field should contain 16 numbers')).toBeVisible()
        );
    });
    it('displays card name error', async () => {
        const { getByRole, getByText } = renderWithProviders(
            <CardPaymentForm />
        );

        const cardNameInput = getByRole('textbox', {
            name: /card name/i,
        });

        cardNameInput.focus();

        cardNameInput.blur();

        await waitFor(() =>
            expect(getByText('field should contain a valid name')).toBeVisible()
        );
    });
    it('displays card expiry error', async () => {
        const { getByRole, getByText } = renderWithProviders(
            <CardPaymentForm />
        );

        const cardExpiryInput = getByRole('textbox', { name: /expiry/i });

        cardExpiryInput.focus();

        cardExpiryInput.blur();

        await waitFor(() =>
            expect(
                getByText('field should contain a valid expiry date')
            ).toBeVisible()
        );
    });

    it('displays card cvc error', async () => {
        const { getByTestId, getByText } = renderWithProviders(
            <CardPaymentForm />
        );

        const cvcInput = getByTestId('cvc');

        cvcInput.focus();

        cvcInput.blur();

        await waitFor(() =>
            expect(getByText('field should contain a valid cvc')).toBeVisible()
        );
    });
});
